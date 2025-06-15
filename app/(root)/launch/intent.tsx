import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import useOnboardingStore from "@/src/store/onboardingStore";
import { useState } from "react";

const options = [
  {
    key: "focus",
    title: "Focus",
    description: "Zone in. Block distractions. Get in flow.",
  },
  {
    key: "power",
    title: "Power",
    description: "Tune for intensity, effort, and energy.",
  },
  {
    key: "recovery",
    title: "Recovery",
    description: "Downshift. Process stress. Recharge.",
  },
];

export default function IntentScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const setIntent = useOnboardingStore((s) => s.setIntent);
  const router = useRouter();

  const handleContinue = () => {
    if (!selected) return;
    setIntent(selected);
    router.push("/launch/level");
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      className="flex-1 px-6 py-12"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="text-white text-[1.75rem] font-bold text-center mt-40">
          What do you want to 
        </Text>
        <Text className="text-white text-[1.75rem] font-bold text-center mb-8">
          tune into today?
        </Text>

        <View className="space-y-4 mb-8">
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              onPress={() => setSelected(opt.key)}
              className={`p-4 rounded-xl border mt-4 ${
                selected === opt.key
                  ? "bg-white/20 border-white"
                  : "bg-white/10 border-white/20"
              }`}
            >
              <Text className="text-white text-lg font-semibold mb-1">
                {opt.title}
              </Text>
              <Text className="text-white/70 text-sm">{opt.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleContinue}
          disabled={!selected}
          className={`mt-auto py-4 px-8 rounded-full border ${
            selected ? "bg-white/10 border-white/30" : "bg-white/5 border-white/10"
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
  );
}
