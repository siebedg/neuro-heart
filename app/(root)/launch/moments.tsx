import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import useOnboardingStore from "@/src/store/onboardingStore";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const primaryOptions = [
  {
    key: "running",
    title: "During running",
    description: "To stay in rhythm, stay focused, and tune my effort.",
    icon: <Ionicons name="walk" size={24} color="#fff" />,
  },
  {
    key: "recovery",
    title: "Post-training recovery",
    description: "To calm down and bring my system back to baseline.",
    icon: <MaterialIcons name="self-improvement" size={24} color="#fff" />,
  },
  {
    key: "boost",
    title: "Pre-race or workout boost",
    description: "To prime my nervous system for intensity.",
    icon: <FontAwesome5 name="bolt" size={20} color="#fff" />,
  },
];

const MomentScreen = () => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const setUseCase = useOnboardingStore((s) => s.setUseCase);

  const handleContinue = () => {
    if (!selectedKey) return;
    setUseCase(selectedKey);
    router.push("/launch/intent");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      className="flex-1 px-6 py-12"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="text-green-400 text-sm text-center mb-2">
          “Let us tune your audio to your performance moments.”
        </Text>
        <Text className="text-white text-2xl font-bold text-center mb-8">
          When do you want audio to guide your performance?
        </Text>

        <View className="space-y-4 mb-8">
          {primaryOptions.map((option) => {
            const selected = selectedKey === option.key;
            return (
              <TouchableOpacity
                key={option.key}
                onPress={() => setSelectedKey(option.key)}
                className={`flex-row items-center p-4 rounded-xl border ${
                  selected
                    ? "bg-white/20 border-white"
                    : "bg-white/10 border-white/20"
                }`}
              >
                <View className="mr-4">{option.icon}</View>
                <View className="flex-1">
                  <Text className="text-white text-lg font-semibold">
                    {option.title}
                  </Text>
                  <Text className="text-white/70 text-sm">
                    {option.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text className="text-green-400 text-sm mb-4">
          To stay focused while working{"\n"}
          Before an intense workout{"\n"}
          To recover after training{"\n"}
          To calm my nervous system{"\n"}
          Other
        </Text>

        <TouchableOpacity
          onPress={handleContinue}
          disabled={!selectedKey}
          className={`mt-auto py-4 rounded-full ${
            selectedKey ? "bg-white" : "bg-white/20"
          }`}
        >
          <Text
            className={`text-center font-semibold text-base ${
              selectedKey ? "text-black" : "text-white/50"
            }`}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default MomentScreen;
