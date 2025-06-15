import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function HomeScreen() {
  const sessions = [
    { title: "Focus Boost", duration: "38 min", date: "Today, 8:20 AM" },
    {
      title: "Recovery Wind-down",
      duration: "25 min",
      date: "Yesterday, 9:45 PM",
    },
  ];

  const returnRate = 82;
  const suggestionStartRate = 64;

  const StatCircle = ({
    percent,
    label,
  }: {
    percent: number;
    label: string;
  }) => {
    return (
      <View className="items-center justify-center bg-white/10 border border-white/15 rounded-xl p-4 flex-1">
        <View className="w-16 h-16 rounded-full border-4 border-white/20 items-center justify-center">
          <Text className="text-white font-bold text-lg">{percent}%</Text>
        </View>
        <Text className="text-white/60 text-xs text-center mt-3">{label}</Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      className="flex-1 px-6 py-12 pb-16"
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <Text className="text-white text-[1.75rem] font-bold mb-12">Home</Text>

        {/* Stats Section */}
        <Text className="text-white/60 text-xs mb-2">YOUR STATS</Text>
        <View className="flex-row gap-4 mb-10">
          <StatCircle
            percent={returnRate}
            label="Return to Home to start sessions"
          />
          <StatCircle
            percent={suggestionStartRate}
            label="Start from smart suggestions"
          />
        </View>

        {/* Boost Suggestion */}
        <View className="bg-white/10 border border-white/15 rounded-2xl p-5 mb-10">
          <Text className="text-white text-xl font-semibold mb-1">
            Need a boost?
          </Text>
          <Text className="text-white/60 text-sm mb-4">
            Try a quick 2-minute Power Tune to energize your focus.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/player")}
            className="py-3 px-6 rounded-full bg-white border border-white/20 w-max self-start"
          >
            <Text className="text-black text-sm font-bold">
              Start Power Tune
            </Text>
          </TouchableOpacity>
        </View>

        {/* Nested Home Link */}
        <TouchableOpacity
          onPress={() => router.push("/home/nested-information")}
          className="flex-row items-center justify-between px-4 py-5 bg-white/10 border border-white/15 rounded-xl"
        >
          <View className="flex-row items-center">
            <Ionicons name="chevron-forward" size={20} color="#fff" />
            <Text className="text-white text-base font-semibold ml-2">
              The science behind Cortune
            </Text>
          </View>
          <Feather name="arrow-right-circle" size={20} color="#fff" />
        </TouchableOpacity>

        {/* Recent Sessions */}
        <Text className="text-white/60 text-xs mb-2 mt-10">RECENT SESSIONS</Text>
        <View className="space-y-3 mb-2">
          {sessions.map((session, idx) => (
            <View
              key={idx}
              className="bg-white/5 border border-white/10 rounded-xl p-4 mb-3"
            >
              <Text className="text-white font-semibold text-base">
                {session.title}
              </Text>
              <Text className="text-white/50 text-sm">
                {session.duration} · {session.date}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
