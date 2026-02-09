import { addWeightEntry, getWeightHistory, updateStartingWeight, updateUserPreferences } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import type { UserProfile } from "@/types/appwrite";
import { useEffect, useState } from "react";

type WeightEntry = { weight: number; date: string };

type WeightChartData = {
  entries: WeightEntry[];
  min: number;
  range: number;
};

export default function useProfileLogic() {
  const { user } = useAuth();
  const prefs = user?.prefs as UserProfile | undefined;
  const [age, setAge] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [activityLevel, setActivityLevel] = useState<string | null>(null);
  const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([]);
  const [previousWeight, setPreviousWeight] = useState<number | null>(null);
  const [editingStartWeight, setEditingStartWeight] = useState(false);
  const [startWeightInput, setStartWeightInput] = useState<string>("");

  useEffect(() => {
    if (prefs?.age) {
      setAge(prefs.age);
    }
    if (prefs?.weight) {
      setWeight(prefs.weight);
    }
    if (prefs?.height) {
      setHeight(prefs.height);
    }
    if (prefs?.gender) {
      setGender(prefs.gender);
    }
    if (prefs?.activityLevel) {
      setActivityLevel(prefs.activityLevel);
    }
    loadWeightHistory();
  }, [prefs, user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (age !== null && age > 0) {
        pushAge();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [age]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (weight !== null && weight > 0) {
        pushWeight();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [weight]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (height !== null && height > 0) {
        pushHeight();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [height]);

  useEffect(() => {
    if (gender) {
      pushGender();
    }
  }, [gender]);

  useEffect(() => {
    if (activityLevel) {
      pushActivityLevel();
    }
  }, [activityLevel]);

  const pushAge = async () => {
    if (age === null || age <= 0) {
      return;
    }

    try {
      await updateUserPreferences({ age });
    } catch (error) {
      console.error("Failed to save age:", error);
    }
  };

  const pushWeight = async () => {
    if (weight === null || weight <= 0) {
      return;
    }

    try {
      if (previousWeight === null || previousWeight !== weight) {
        await addWeightEntry(weight);
        setPreviousWeight(weight);
        loadWeightHistory();
      }
      await updateUserPreferences({ weight });
    } catch (error) {
      console.error("Failed to save weight:", error);
    }
  };

  const loadWeightHistory = async () => {
    try {
      const history = await getWeightHistory();
      setWeightHistory(history);
      if (history.length > 0) {
        setStartWeightInput(history[0].weight.toString());
      }
    } catch (error) {
      console.error("Failed to load weight history:", error);
    }
  };

  const handleSaveStartWeight = async () => {
    if (startWeightInput && parseFloat(startWeightInput) > 0) {
      try {
        const parsed = parseFloat(startWeightInput);
        const rounded = Math.round(parsed * 100) / 100;
        await updateStartingWeight(rounded);
        await loadWeightHistory();
        setEditingStartWeight(false);
      } catch (error) {
        console.error("Failed to update starting weight:", error);
      }
    }
  };

  const handleStartWeightInputChange = (text: string) => {
    const normalized = text.replace(",", ".");
    if (normalized === "") {
      setStartWeightInput("");
      return;
    }
    if (!/^\d*(\.\d{0,2})?$/.test(normalized)) {
      return;
    }
    setStartWeightInput(normalized);
  };

  const pushHeight = async () => {
    if (height === null || height <= 0) {
      return;
    }

    try {
      await updateUserPreferences({ height });
    } catch (error) {
      console.error("Failed to save height:", error);
    }
  };

  const pushGender = async () => {
    if (!gender) {
      return;
    }

    try {
      await updateUserPreferences({ gender });
    } catch (error) {
      console.error("Failed to save gender:", error);
    }
  };

  const pushActivityLevel = async () => {
    if (!activityLevel) {
      return;
    }

    try {
      await updateUserPreferences({ activityLevel });
    } catch (error) {
      console.error("Failed to save activity level:", error);
    }
  };

  const getActivityMultiplier = () => {
    switch (activityLevel) {
      case "Sedentary":
        return 1.2;
      case "Lightly Active":
        return 1.375;
      case "Moderately Active":
        return 1.55;
      case "Very Active":
        return 1.725;
      case "Extremely Active":
        return 1.9;
      default:
        return 1;
    }
  };

  const calculateBMR = () => {
    if (age === null || weight === null || height === null) {
      return null;
    }

    if (gender === "Male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    }

    if (gender === "Female") {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }

    return null;
  };

  const calculateTDEE = () => {
    const bmr = calculateBMR();
    if (bmr === null) {
      return null;
    }
    return bmr * getActivityMultiplier();
  };

  const calculateBMI = () => {
    if (weight === null || height === null) {
      return null;
    }
    return (weight / ((height / 100) * (height / 100))).toFixed(1);
  };

  const getWeightChartData = (): WeightChartData => {
    if (weightHistory.length === 0) {
      return { entries: [], min: 0, range: 1 };
    }

    const entries = weightHistory.slice(-14);
    const weights = entries.map((entry) => entry.weight);
    const min = Math.min(...weights);
    const max = Math.max(...weights);
    const range = Math.max(max - min, 1);

    return { entries, min, range };
  };

  return {
    user,
    age,
    setAge,
    weight,
    setWeight,
    height,
    setHeight,
    gender,
    setGender,
    activityLevel,
    setActivityLevel,
    weightHistory,
    editingStartWeight,
    setEditingStartWeight,
    startWeightInput,
    setStartWeightInput,
    handleStartWeightInputChange,
    handleSaveStartWeight,
    calculateBMR,
    calculateTDEE,
    calculateBMI,
    getWeightChartData,
  };
}
