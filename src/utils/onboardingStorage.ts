import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "hasCompletedOnboarding";

export const markOnboardingComplete = async () => {
  await AsyncStorage.setItem(KEY, "true");
};

export const hasSeenOnboarding = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(KEY);
  return value === "true";
};

export const resetOnboarding = async () => {
  await AsyncStorage.removeItem(KEY);
};