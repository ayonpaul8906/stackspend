import { chatgptPlans } from "./chatgpt";
import { claudePlans } from "./claude";

export const pricingDatabase = [
  ...chatgptPlans,
  ...claudePlans,
];