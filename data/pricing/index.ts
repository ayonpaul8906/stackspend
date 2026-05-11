import { chatgptPlans } from "./chatgpt";
import { claudePlans } from "./claude";
import { cursorPlans } from "./cursor";
import { windsurfPlans } from "./windsurf";
import { geminiPlans } from "./gemini";
import { githubCopilotPlans } from "./github-copilot";
import { openaiApiPlans } from "./openai-api";

export const pricingDatabase = [
  ...chatgptPlans,
  ...claudePlans,
  ...cursorPlans,
  ...windsurfPlans,
  ...geminiPlans,
  ...githubCopilotPlans,
  ...openaiApiPlans,
];