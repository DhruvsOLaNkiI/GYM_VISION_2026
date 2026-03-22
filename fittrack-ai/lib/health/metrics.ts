// ============================================================
// FitTrack AI — Health Calculation Utilities
// Pure TypeScript — no external dependencies
// ============================================================

export type Gender = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
export type Goal = "lose_weight" | "maintain" | "gain_muscle";

// Activity level multipliers for TDEE
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

// Activity level display names
export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Sedentary (little/no exercise)",
  light: "Light (1-3 days/week)",
  moderate: "Moderate (3-5 days/week)",
  active: "Active (6-7 days/week)",
  very_active: "Very Active (intense daily)",
};

// Goal display names
export const GOAL_LABELS: Record<Goal, string> = {
  lose_weight: "Lose Weight",
  maintain: "Maintain Weight",
  gain_muscle: "Gain Muscle",
};

// ----------------------------------------------------------
// BMI — Body Mass Index
// ----------------------------------------------------------
export function calculateBMI(weightKg: number, heightCm: number): number {
  if (weightKg <= 0 || heightCm <= 0) return 0;
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export function getBMICategory(bmi: number): {
  label: string;
  color: string;
  description: string;
} {
  if (bmi < 18.5)
    return {
      label: "Underweight",
      color: "#3B82F6",
      description: "Below normal weight range",
    };
  if (bmi < 25)
    return {
      label: "Normal",
      color: "#22C55E",
      description: "Healthy weight range",
    };
  if (bmi < 30)
    return {
      label: "Overweight",
      color: "#F59E0B",
      description: "Above normal weight range",
    };
  return {
    label: "Obese",
    color: "#EF4444",
    description: "Significantly above normal range",
  };
}

// ----------------------------------------------------------
// BMR — Basal Metabolic Rate (Mifflin-St Jeor Equation)
// ----------------------------------------------------------
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  gender: Gender
): number {
  if (weightKg <= 0 || heightCm <= 0 || age <= 0) return 0;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(gender === "male" ? base + 5 : base - 161);
}

// ----------------------------------------------------------
// TDEE — Total Daily Energy Expenditure
// ----------------------------------------------------------
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  if (bmr <= 0) return 0;
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
}

// ----------------------------------------------------------
// Body Fat % — Navy Method
// ----------------------------------------------------------
export function calculateBodyFat(
  gender: Gender,
  waistCm: number,
  neckCm: number,
  heightCm: number,
  hipCm?: number
): number | null {
  if (waistCm <= 0 || neckCm <= 0 || heightCm <= 0) return null;

  if (gender === "male") {
    const diff = waistCm - neckCm;
    if (diff <= 0) return null;
    const bodyFat =
      86.01 * Math.log10(diff) -
      70.041 * Math.log10(heightCm) +
      36.76;
    return Math.round(bodyFat * 10) / 10;
  } else {
    if (!hipCm || hipCm <= 0) return null;
    const sum = waistCm + hipCm - neckCm;
    if (sum <= 0) return null;
    const bodyFat =
      163.205 * Math.log10(sum) -
      97.684 * Math.log10(heightCm) -
      78.387;
    return Math.round(bodyFat * 10) / 10;
  }
}

// ----------------------------------------------------------
// Daily Protein Target (grams)
// ----------------------------------------------------------
export function calculateProteinTarget(weightKg: number, goal: Goal): number {
  if (weightKg <= 0) return 0;
  const multipliers: Record<Goal, number> = {
    lose_weight: 2.0, // Higher protein to preserve muscle during fat loss
    maintain: 1.6,
    gain_muscle: 2.2,
  };
  return Math.round(weightKg * multipliers[goal]);
}

// ----------------------------------------------------------
// Daily Water Intake (liters and glasses)
// ----------------------------------------------------------
export function calculateWaterIntake(weightKg: number): {
  liters: number;
  glasses: number;
} {
  if (weightKg <= 0) return { liters: 0, glasses: 0 };
  // ~33ml per kg of body weight
  const liters = Math.round((weightKg * 0.033) * 10) / 10;
  const glasses = Math.round(liters / 0.25); // 250ml per glass
  return { liters, glasses };
}

// ----------------------------------------------------------
// Daily Calorie Target
// ----------------------------------------------------------
export function calculateCalorieTarget(tdee: number, goal: Goal): number {
  if (tdee <= 0) return 0;
  const adjustments: Record<Goal, number> = {
    lose_weight: -500, // 500 calorie deficit
    maintain: 0,
    gain_muscle: 300, // 300 calorie surplus
  };
  return Math.max(1200, Math.round(tdee + adjustments[goal]));
}

// ----------------------------------------------------------
// Macro Targets (grams per day)
// ----------------------------------------------------------
export function calculateMacroTargets(
  calorieTarget: number,
  goal: Goal
): {
  protein: number;
  carbs: number;
  fat: number;
} {
  if (calorieTarget <= 0) return { protein: 0, carbs: 0, fat: 0 };

  // Macro ratios based on goal
  const ratios: Record<Goal, { protein: number; carbs: number; fat: number }> = {
    lose_weight: { protein: 0.35, carbs: 0.35, fat: 0.30 },
    maintain: { protein: 0.30, carbs: 0.40, fat: 0.30 },
    gain_muscle: { protein: 0.30, carbs: 0.45, fat: 0.25 },
  };

  const r = ratios[goal];
  return {
    protein: Math.round((calorieTarget * r.protein) / 4), // 4 cal per gram
    carbs: Math.round((calorieTarget * r.carbs) / 4),     // 4 cal per gram
    fat: Math.round((calorieTarget * r.fat) / 9),         // 9 cal per gram
  };
}

// ----------------------------------------------------------
// Calorie Burn from Exercise (MET-based)
// ----------------------------------------------------------
export function calculateCaloriesBurned(
  met: number,
  weightKg: number,
  durationMinutes: number
): number {
  if (met <= 0 || weightKg <= 0 || durationMinutes <= 0) return 0;
  // Formula: calories = MET × weight(kg) × duration(hours)
  return Math.round(met * weightKg * (durationMinutes / 60));
}

// ----------------------------------------------------------
// Unit Conversions
// ----------------------------------------------------------
export function kgToLbs(kg: number): number {
  return Math.round(kg * 2.20462 * 10) / 10;
}

export function lbsToKg(lbs: number): number {
  return Math.round(lbs / 2.20462 * 10) / 10;
}

export function cmToFeetInches(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

export function feetInchesToCm(feet: number, inches: number): number {
  return Math.round((feet * 12 + inches) * 2.54 * 10) / 10;
}
