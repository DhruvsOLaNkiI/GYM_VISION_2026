import { Gender, ActivityLevel, Goal } from "@/lib/health/metrics";

export type AIProvider = "anthropic" | "groq" | "gemini";


export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  // Optional Navy method measurements
  waistCm: number;
  neckCm: number;
  hipCm: number;
  // Preferences
  useMetric: boolean;
  aiProvider: AIProvider;
}


export interface HealthMetrics {
  bmi: number;
  bmiCategory: { label: string; color: string; description: string };
  bmr: number;
  tdee: number;
  bodyFat: number | null;
  proteinTarget: number;
  waterIntake: { liters: number; glasses: number };
  calorieTarget: number;
  macroTargets: { protein: number; carbs: number; fat: number };
}

export const DEFAULT_PROFILE: UserProfile = {
  name: "",
  age: 25,
  gender: "male",
  weightKg: 70,
  heightCm: 170,
  activityLevel: "moderate",
  goal: "maintain",
  waistCm: 0,
  neckCm: 0,
  hipCm: 0,
  useMetric: true,
  aiProvider: "anthropic",
};

