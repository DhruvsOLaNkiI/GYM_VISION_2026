import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile, HealthMetrics, DEFAULT_PROFILE } from "@/types/profile";
import {
  calculateBMI,
  getBMICategory,
  calculateBMR,
  calculateTDEE,
  calculateBodyFat,
  calculateProteinTarget,
  calculateWaterIntake,
  calculateCalorieTarget,
  calculateMacroTargets,
} from "@/lib/health/metrics";

const PROFILE_KEY = "@fittrack_profile";

export function useProfile() {
  const [profile, setProfileState] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from AsyncStorage on mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem(PROFILE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<UserProfile>;
        setProfileState({ ...DEFAULT_PROFILE, ...parsed });
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save and update a single profile field
  const updateProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      const newProfile = { ...profile, ...updates };
      setProfileState(newProfile);
      try {
        await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
      } catch (error) {
        console.error("Failed to save profile:", error);
      }
    },
    [profile]
  );

  // Calculate all health metrics from current profile
  const metrics: HealthMetrics = {
    bmi: calculateBMI(profile.weightKg, profile.heightCm),
    bmiCategory: getBMICategory(calculateBMI(profile.weightKg, profile.heightCm)),
    bmr: calculateBMR(profile.weightKg, profile.heightCm, profile.age, profile.gender),
    tdee: calculateTDEE(
      calculateBMR(profile.weightKg, profile.heightCm, profile.age, profile.gender),
      profile.activityLevel
    ),
    bodyFat: calculateBodyFat(
      profile.gender,
      profile.waistCm,
      profile.neckCm,
      profile.heightCm,
      profile.hipCm
    ),
    proteinTarget: calculateProteinTarget(profile.weightKg, profile.goal),
    waterIntake: calculateWaterIntake(profile.weightKg),
    calorieTarget: calculateCalorieTarget(
      calculateTDEE(
        calculateBMR(profile.weightKg, profile.heightCm, profile.age, profile.gender),
        profile.activityLevel
      ),
      profile.goal
    ),
    macroTargets: calculateMacroTargets(
      calculateCalorieTarget(
        calculateTDEE(
          calculateBMR(profile.weightKg, profile.heightCm, profile.age, profile.gender),
          profile.activityLevel
        ),
        profile.goal
      ),
      profile.goal
    ),
  };

  return { profile, updateProfile, metrics, isLoading };
}
