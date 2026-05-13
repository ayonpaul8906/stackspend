import { describe, it, expect } from 'vitest';
import { runAuditEngine } from '@/lib/audit-engine/runAudit';
import { generateRecommendations } from '@/lib/audit-engine/rules';
import { AuditFormState } from '@/types/audit';

describe('Audit Engine - Rules', () => {
  // Test 1: ChatGPT Business with <=2 seats
  it('should recommend downgrade for ChatGPT Business with <= 2 seats', () => {
    const state: AuditFormState = {
      tools: [
        {
          tool: 'ChatGPT',
          plan: 'Business',
          seats: 2,
          monthlySpend: 60,
        }
      ],
      useCase: 'writing'
    };

    const recommendations = generateRecommendations(state);
    
    expect(recommendations).toHaveLength(1);
    const rec = recommendations[0];
    expect(rec.tool).toBe('ChatGPT');
    expect(rec.recommendedPlan).toBe('chatgpt-plus');
    expect(rec.action).toBe('downgrade');
    expect(rec.severity).toBe('team_overkill');
    expect(rec.monthlySavings).toBe(20); // 60 - (2 * 20)
    expect(rec.annualSavings).toBe(240); // 20 * 12
    expect(rec.reasoning).toBeTruthy();
    expect(rec.confidence).toBe('high');
  });

  // Test 2: Claude Team with <5 seats
  it('should detect team overkill for Claude Team with < 5 seats', () => {
    const state: AuditFormState = {
      tools: [
        {
          tool: 'Claude',
          plan: 'Team',
          seats: 3,
          monthlySpend: 90, // Claude team minimum is 5, but let's say they inputted 3 and paid 90
        }
      ],
      useCase: 'writing'
    };

    const recommendations = generateRecommendations(state);
    
    expect(recommendations).toHaveLength(1);
    const rec = recommendations[0];
    expect(rec.tool).toBe('Claude');
    expect(rec.recommendedPlan).toBe('claude-pro');
    expect(rec.action).toBe('downgrade');
    expect(rec.severity).toBe('team_overkill');
    expect(rec.monthlySavings).toBe(30); // 90 - (3 * 20)
    expect(rec.annualSavings).toBe(360);
    expect(rec.reasoning).toBeTruthy();
    expect(rec.confidence).toBe('high');
  });

  // Test 3: Duplicate tooling detection
  it('should detect duplicate tooling (ChatGPT + Claude + Gemini overlap)', () => {
    const state: AuditFormState = {
      tools: [
        { tool: 'ChatGPT', plan: 'Plus', seats: 1, monthlySpend: 20 },
        { tool: 'Claude', plan: 'Pro', seats: 1, monthlySpend: 20 },
        { tool: 'Gemini', plan: 'Advanced', seats: 1, monthlySpend: 20 }
      ],
      useCase: 'writing' // Use case must be writing, research, or mixed
    };

    const recommendations = generateRecommendations(state);
    
    // Should keep the first one, recommend consolidating the others
    expect(recommendations).toHaveLength(3); // One keep for ChatGPT, two consolidates
    
    const consolidates = recommendations.filter(r => r.action === 'consolidate');
    expect(consolidates).toHaveLength(2);
    expect(consolidates.map(r => r.tool)).toContain('Claude');
    expect(consolidates.map(r => r.tool)).toContain('Gemini');
    expect(consolidates[0].monthlySavings).toBe(20);
    expect(consolidates[1].monthlySavings).toBe(20);
  });

  // Test 5: Optimized stack returns "keep" recommendation
  it('should return "keep" recommendation for optimized stack', () => {
    const state: AuditFormState = {
      tools: [
        {
          tool: 'ChatGPT',
          plan: 'Plus',
          seats: 1,
          monthlySpend: 20,
        }
      ],
      useCase: 'coding'
    };

    const recommendations = generateRecommendations(state);
    
    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].action).toBe('keep');
    expect(recommendations[0].monthlySavings).toBe(0);
    expect(recommendations[0].annualSavings).toBe(0);
    expect(recommendations[0].severity).toBe('optimized');
  });
});

describe('Audit Engine - Calculations', () => {
  // Test 4: Annual savings calculation accuracy
  it('should accurately calculate monthly and annual savings', () => {
    const state: AuditFormState = {
      tools: [
        { tool: 'ChatGPT', plan: 'Business', seats: 2, monthlySpend: 60 } // downgraded to Plus: 2 * 20 = 40. Savings = 20
      ],
      useCase: 'writing'
    };

    const result = runAuditEngine(state);
    
    expect(result.totalCurrentMonthlySpend).toBe(60);
    expect(result.totalOptimizedMonthlySpend).toBe(40);
    expect(result.totalMonthlySavings).toBe(20);
    expect(result.totalAnnualSavings).toBe(240); // 20 * 12
  });

  it('should calculate optimization score range correctly', () => {
    const state: AuditFormState = {
      tools: [
        { tool: 'ChatGPT', plan: 'Business', seats: 2, monthlySpend: 60 } // Savings = 20. Ratio = 20/60 = 0.333. Score = 100 - 33 = 67
      ],
      useCase: 'writing'
    };

    const result = runAuditEngine(state);
    expect(result.optimizationScore).toBe(67);
    expect(result.isOptimized).toBe(false); // Since savings is 20, but wait, condition: totalMonthlySavings < 20 || ratio < 0.05. Here it's exactly 20, so false (20 < 20 is false, 0.33 < 0.05 is false)
  });

  it('should handle zero savings edge cases correctly', () => {
    const state: AuditFormState = {
      tools: [
        { tool: 'ChatGPT', plan: 'Plus', seats: 1, monthlySpend: 20 }
      ],
      useCase: 'coding'
    };

    const result = runAuditEngine(state);
    expect(result.totalMonthlySavings).toBe(0);
    expect(result.totalAnnualSavings).toBe(0);
    expect(result.optimizationScore).toBe(100);
    expect(result.isOptimized).toBe(true);
  });
});

describe('Audit Engine - Invalid Input Handling', () => {
  it('should handle missing pricing data gracefully', () => {
    const state: AuditFormState = {
      tools: [
        // @ts-expect-error - simulating missing pricing data
        { tool: 'ChatGPT', plan: 'Plus', seats: 1 }
      ],
      useCase: 'coding'
    };

    // Assuming missing monthlySpend results in NaN if not handled, let's see how engine deals with it
    const result = runAuditEngine(state);
    // Since we want it to fail gracefully, we expect it not to crash
    // Let's modify the runAuditEngine to handle this if it doesn't already
    expect(result).toBeDefined();
  });

  it('should handle invalid seat counts', () => {
    const state: AuditFormState = {
      tools: [
        { tool: 'ChatGPT', plan: 'Business', seats: 0, monthlySpend: 60 },
        { tool: 'Claude', plan: 'Team', seats: -5, monthlySpend: 100 }
      ],
      useCase: 'writing'
    };

    const result = runAuditEngine(state);
    expect(result).toBeDefined();
  });

  it('should handle malformed audit inputs', () => {
    // @ts-expect-error - simulating malformed inputs
    const state: AuditFormState = {
      tools: null,
      useCase: null
    };

    const result = runAuditEngine(state);
    expect(result.totalCurrentMonthlySpend).toBe(0);
    expect(result.totalOptimizedMonthlySpend).toBe(0);
    expect(result.recommendations).toHaveLength(0);
  });
});
