import React, { useEffect, useState } from "react";
import useAuthStore from "@/src/store/authStore";
import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { resetOnboarding } from "@/src/utils/onboardingStorage";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/firebase/config";

export default function ProfileScreen() { 
  const user = useAuthStore((s) => s.user);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchName = async () => {
      if (!user?.uid) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name ?? null);
      }
    };
    fetchName();
  }, [user?.uid]);

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      className="flex-1 px-6 py-12"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        {/* Settings Button */}
        <TouchableOpacity 
          onPress={() => router.push("/profile/settings")}
          className="absolute top-6 right-0 z-10"
        >
          <Ionicons name="settings-sharp" size={28} color="white" />
        </TouchableOpacity>

        {/* Profile Section */}
        <View className="items-center mt-20 space-y-6">
          {/* Reset Button */}
          <TouchableOpacity onPress={resetOnboarding}>
            <Text className="text-red-600 text-small">Reset Onboarding</Text>
          </TouchableOpacity>

          {/* Profile Card */}
          <View className="bg-white/10 border border-white/20 rounded-xl p-6 w-full max-w-sm items-center">
            <Image
              source={{ uri: "https://picsum.photos/id/237/200/300" }}
              className="w-24 h-24 rounded-full mb-4"
            />
            <Text className="text-white text-xl font-bold mb-1">
              {name ?? "Unknown User"}
            </Text>
            <Text className="text-white/70 text-sm mb-4">Joined: Jun 2025</Text>
            <View className="w-full border-t border-white/10 my-2" />
            <Text className="text-white text-base">Plan: Free Tier</Text>
          </View>

          {/* Performance Card */}
          <View className="bg-white/5 border border-white/10 rounded-xl p-4 w-full max-w-sm mt-4">
            <Text className="text-white font-semibold mb-2 text-lg">
              Performance Overview
            </Text>
            <Text className="text-white/70 text-sm mb-1">HRV Avg: 64ms</Text>
            <Text className="text-white/70 text-sm mb-1">
              Top Session: Power Boost
            </Text>
            <Text className="text-white/70 text-sm">
              Preferred Intent: Focus
            </Text>
          </View>

          {/* Engagement Card */}
          <View className="bg-white/5 border border-white/10 rounded-xl p-4 w-full max-w-sm mt-4">
            <Text className="text-white font-semibold mb-2 text-lg">
              Engagement Insights
            </Text>
            <Text className="text-white/70 text-sm mb-1">
              Avg. Session Duration: 12 min
            </Text>
            <Text className="text-white/70 text-sm mb-1">
              Most Active Day: Tuesday
            </Text>
            <Text className="text-white/70 text-sm">
              Current Streak: 4 days
            </Text>
          </View>

          {/* Recommendations Card */}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
