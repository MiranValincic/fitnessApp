import { Account, Client, Databases } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

export const account = new Account(client);
export const databases = new Databases(client);

// Database connection
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const VIDEOS_COLLECTION_ID = "videos";
export const connectToDatabase = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, VIDEOS_COLLECTION_ID);
    console.log("✅ Successfully connected to database:", response);
    return response;
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
    throw error;
  }
};

export const updateUserPreferences = async (preferences: Record<string, any>) => {
  try {
    const user = await account.get();
    const existingPrefs = user.prefs || {};
    const mergedPrefs = { ...existingPrefs, ...preferences };
    const response = await account.updatePrefs(mergedPrefs);
    return response;
  } catch (error) {
    console.error("Error updating preferences:", error);
    throw error;
  }
};

export const addWeightEntry = async (weight: number) => {
  try {
    const user = await account.get();
    const existingPrefs = user.prefs || {};
    const weightHistory = existingPrefs.weightHistory ? JSON.parse(existingPrefs.weightHistory) : [];

    const newEntry = {
      weight,
      date: new Date().toISOString(),
    };

    weightHistory.push(newEntry);

    // Keep only last 365 entries
    if (weightHistory.length > 365) {
      weightHistory.shift();
    }

    const mergedPrefs = {
      ...existingPrefs,
      weightHistory: JSON.stringify(weightHistory),
    };

    const response = await account.updatePrefs(mergedPrefs);
    return response;
  } catch (error) {
    console.error("Error adding weight entry:", error);
    throw error;
  }
};

export const getWeightHistory = async () => {
  try {
    const user = await account.get();
    const existingPrefs = user.prefs || {};
    const weightHistory = existingPrefs.weightHistory ? JSON.parse(existingPrefs.weightHistory) : [];
    return weightHistory;
  } catch (error) {
    console.error("Error getting weight history:", error);
    return [];
  }
};

export const updateStartingWeight = async (newStartingWeight: number) => {
  try {
    const user = await account.get();
    const existingPrefs = user.prefs || {};
    const weightHistory = existingPrefs.weightHistory ? JSON.parse(existingPrefs.weightHistory) : [];

    if (weightHistory.length > 0) {
      // Update the first entry's weight
      weightHistory[0].weight = newStartingWeight;

      const mergedPrefs = {
        ...existingPrefs,
        weightHistory: JSON.stringify(weightHistory),
      };

      const response = await account.updatePrefs(mergedPrefs);
      return response;
    }
  } catch (error) {
    console.error("Error updating starting weight:", error);
    throw error;
  }
};
