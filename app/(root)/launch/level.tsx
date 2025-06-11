import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { router, Stack } from "expo-router";
import useOnboardingStore from "@/src/store/onboardingStore";
import { useState } from "react";

const LEVELS = [
  {
    id: "beginner",
    label: "Beginner",
    description: "New to training or mindfulness.",
  },
  {
    id: "intermediate",
    label: "Intermediate",
    description: "Train 1–3x/week or already mindful.",
  },
  {
    id: "advanced",
    label: "Advanced",
    description: "Consistent performer with clear goals.",
  },
] as const;

type LevelOption = (typeof LEVELS)[number]["id"];

export default function LevelScreen() {
  const onboarding = useOnboardingStore();
  const [selected, setSelected] = useState<LevelOption | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    onboarding.setFitnessLevel(selected);
    router.push("/launch/account");
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerTransparent: true,
          headerShadowVisible: false,
          headerTintColor: "white",
        }}
      />

      <ImageBackground
        source={require("@/assets/images/background.png")}
        className="flex-1 px-6 py-12"
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text className="text-white text-3xl font-bold text-center mt-48 mb-8">
            What's your fitness level?
          </Text>

          <View className="w-full mx-auto space-y-4 mb-8">
            {" "}
            {LEVELS.map((level) => (
              <TouchableOpacity
                key={level.id}
                onPress={() => setSelected(level.id)}
                className={`p-4 rounded-xl mt-4 border ${
                  selected === level.id
                    ? "bg-white/20 border-white"
                    : "bg-white/10 border-white/20"
                }`}
              >
                <Text className="text-white text-lg font-semibold mb-1">
                  {level.label}
                </Text>
                <Text className="text-gray-300">{level.description}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={handleContinue}
            disabled={!selected}
            className={`mt-auto py-4 px-8 rounded-full border ${
              selected
                ? "bg-white/10 border-white/30"
                : "bg-white/5 border-white/10"
            }`}
          >
            <Text
              className={`text-center text-lg font-semibold ${
                selected ? "text-white" : "text-white/50"
              }`}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </>
  );
}
