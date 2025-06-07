import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import useOnboardingStore from "@/src/store/onboardingStore";
import { useState } from "react";

const options = [
  { key: "focus", title: "Focus", description: "Zone in. Block distractions. Get in flow." },
  { key: "power", title: "Power", description: "Tune for intensity, effort, and energy." },
  { key: "recovery", title: "Recovery", description: "Downshift. Process stress. Recharge." },
];

export default function IntentScreen() {
  const [selected, setSelected] = useState<string | null>(null);
  const setIntent = useOnboardingStore((s) => s.setIntent);
  const router = useRouter();

  const handleContinue = () => {
    if (!selected) return;
    setIntent(selected);
    router.push("/launch/account");
  };

  return (
    <View className="flex-1 px-6 py-12 justify-between">
      <View>
        <Text className="text-green-400 font-semibold mb-2">Which mental state do you need today?</Text>
        <Text className="text-white text-3xl font-bold mb-6">What do you want to tune into today?</Text>

        {options.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            onPress={() => setSelected(opt.key)}
            className={`rounded-3xl px-5 py-4 mb-4 border-2 ${selected === opt.key ? "border-white bg-white/10" : "border-white/20 bg-white/5"}`}
          >
            <Text className="text-white text-lg font-semibold mb-1">{opt.title}</Text>
            <Text className="text-white/70 text-sm leading-tight">{opt.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        disabled={!selected}
        onPress={handleContinue}
        className={`w-full py-4 rounded-full mt-6 ${selected ? "bg-white" : "bg-white/20"}`}
      >
        <Text className={`text-center text-base font-bold ${selected ? "text-black" : "text-white/50"}`}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
