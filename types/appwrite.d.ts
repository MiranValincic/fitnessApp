import "react-native-appwrite";

declare module "react-native-appwrite" {
  namespace Models {
    interface Preferences {
      age?: number;
      weight?: number;
      height?: number;
      activityLevel?: string;
      dietaryRestrictions?: string[];
      healthGoals?: string[];
      mealPreferences?: string[];
      favoriteCuisines?: string[];
      dislikedIngredients?: string[];
      cookingSkillLevel?: string;
      budgetPerMeal?: number;
      mealFrequencyPerDay?: number;
      hydrationGoalLiters?: number;
      sleepGoalHours?: number;
      stressManagementTechniques?: string[];
      medicalConditions?: string[];
      allergies?: string[];
      supplements?: string[];
      workoutTypes?: string[];
      workoutDurationMinutes?: number;
      workoutFrequencyPerWeek?: number;
      mindfulnessPractices?: string[];
      trackingPreferences?: {
        nutritionTracking?: boolean;
        fitnessTracking?: boolean;
        sleepTracking?: boolean;
        hydrationTracking?: boolean;
        stressTracking?: boolean;
      };
    }
  }
}
