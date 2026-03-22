export interface Exercise {
  id: string;
  name: string;
  icon: string;
  iconFamily: "Ionicons" | "MaterialIcons" | "MaterialCommunityIcons";
  met: number;
  category: "Strength" | "Cardio" | "Flexibility" | "Core";
  description: string;
  targetMuscles: string[];
  angleThresholds: {
    down: number;
    up: number;
    joint: string;
  };
}

export const EXERCISES: Exercise[] = [
  {
    id: "pushup",
    name: "Push-ups",
    icon: "fitness-center",
    iconFamily: "MaterialIcons",
    met: 8.0,
    category: "Strength",
    description: "Classic upper body exercise targeting chest, shoulders, and triceps",
    targetMuscles: ["Chest", "Shoulders", "Triceps"],
    angleThresholds: { down: 90, up: 160, joint: "elbow" },
  },
  {
    id: "squat",
    name: "Squats",
    icon: "human",
    iconFamily: "MaterialCommunityIcons",
    met: 5.0,
    category: "Strength",
    description: "Lower body compound exercise targeting quads, hamstrings, and glutes",
    targetMuscles: ["Quadriceps", "Hamstrings", "Glutes"],
    angleThresholds: { down: 90, up: 160, joint: "knee" },
  },
  {
    id: "bicep-curl",
    name: "Bicep Curls",
    icon: "arm-flex",
    iconFamily: "MaterialCommunityIcons",
    met: 3.5,
    category: "Strength",
    description: "Isolation exercise for bicep muscle growth",
    targetMuscles: ["Biceps"],
    angleThresholds: { down: 140, up: 40, joint: "elbow" },
  },
  {
    id: "lunge",
    name: "Lunges",
    icon: "walk",
    iconFamily: "MaterialCommunityIcons",
    met: 6.0,
    category: "Strength",
    description: "Unilateral leg exercise for balance and strength",
    targetMuscles: ["Quadriceps", "Glutes", "Hamstrings"],
    angleThresholds: { down: 100, up: 160, joint: "knee" },
  },
  {
    id: "shoulder-press",
    name: "Shoulder Press",
    icon: "weight-lifter",
    iconFamily: "MaterialCommunityIcons",
    met: 5.0,
    category: "Strength",
    description: "Overhead pressing movement for shoulder development",
    targetMuscles: ["Shoulders", "Triceps"],
    angleThresholds: { down: 90, up: 160, joint: "elbow" },
  },
  {
    id: "plank",
    name: "Plank",
    icon: "accessibility",
    iconFamily: "MaterialIcons",
    met: 4.0,
    category: "Core",
    description: "Isometric core exercise for stability and endurance",
    targetMuscles: ["Core", "Shoulders"],
    angleThresholds: { down: 170, up: 180, joint: "body" },
  },
  {
    id: "jumping-jack",
    name: "Jumping Jacks",
    icon: "run",
    iconFamily: "MaterialCommunityIcons",
    met: 7.0,
    category: "Cardio",
    description: "Full body cardio exercise to raise heart rate",
    targetMuscles: ["Full Body"],
    angleThresholds: { down: 30, up: 150, joint: "arms" },
  },
  {
    id: "situp",
    name: "Sit-ups",
    icon: "airline-seat-flat",
    iconFamily: "MaterialIcons",
    met: 4.0,
    category: "Core",
    description: "Core exercise targeting abdominal muscles",
    targetMuscles: ["Abdominals", "Hip Flexors"],
    angleThresholds: { down: 140, up: 60, joint: "hip" },
  },
];

export const EXERCISE_CATEGORIES = [
  { id: "strength", name: "Strength", color: "#FDE8D8", textColor: "#C2410C", icon: "fitness-center" },
  { id: "cardio", name: "Cardio", color: "#CFFAFE", textColor: "#0E7490", icon: "directions-run" },
  { id: "core", name: "Core", color: "#E0E7FF", textColor: "#4338CA", icon: "accessibility" },
  { id: "flexibility", name: "Flexibility", color: "#FCE7F3", textColor: "#BE185D", icon: "self-improvement" },
] as const;

export const REST_TIMER_OPTIONS = [30, 60, 90] as const;
