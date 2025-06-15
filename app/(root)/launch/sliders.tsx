import React, { useState, useEffect, useRef } from "react";
import { View, Text, ImageBackground, Animated, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import useAuthStore from "@/src/store/authStore";
import useOnboardingStore from "@/src/store/onboardingStore";
import { markOnboardingComplete } from "@/src/utils/onboardingStorage";
import { saveOnboardingDataToFirebase } from "@/src/utils/saveToFirebase";
import { FontAwesome } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";

interface SliderConfig {
  id: string;
  label: string;
  target: number;
  icon: string;
}

const SLIDERS: SliderConfig[] = [
  {
    id: "neural",
    label: "Neural Effect Level",
    target: 1,
    icon: "music",
  },
  {
    id: "complexity",
    label: "Music Complexity",
    target: 1,
    icon: "music",
  },
  {
    id: "genres",
    label: "Ideal Genres",
    target: 1,
    icon: "star",
  },
  {
    id: "activities",
    label: "Activities",
    target: 1,
    icon: "heartbeat",
  },
];

export default function PersonalizationScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const onboarding = useOnboardingStore();

  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Animation values for each slider
  const sliderAnimations = useRef(
    SLIDERS.map(() => new Animated.Value(0))
  ).current;

  const fadeInAnimation = useRef(new Animated.Value(0)).current;
  const completionAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    startPersonalization();
  }, []);

  const startPersonalization = () => {
    // Initial fade in
    Animated.timing(fadeInAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      // Start slider animations
      animateSliders();
    });
  };

  const animateSliders = () => {
    const animateSlider = (index: number) => {
      if (index >= SLIDERS.length) {
        // All sliders complete
        setTimeout(() => {
          completePersonalization();
        }, 1000);
        return;
      }

      setCurrentSliderIndex(index);

      // Haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      Animated.timing(sliderAnimations[index], {
        toValue: SLIDERS[index].target,
        duration: 1800,
        useNativeDriver: false,
      }).start(() => {
        // Move to next slider after delay
        setTimeout(() => {
          animateSlider(index + 1);
        }, 600);
      });
    };

    animateSlider(0);
  };

  const completePersonalization = async () => {
    setIsComplete(true);

    // Strong haptic feedback for completion
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Completion animation
    Animated.timing(completionAnimation, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Save data and navigate
    try {
      await markOnboardingComplete();

      const data = {
        useCase: onboarding.useCase,
        intent: onboarding.intent,
        fitnessLevel: onboarding.fitnessLevel,
        name: onboarding.name,
        age: onboarding.age,
        neuralEffect: SLIDERS[0].target,
        complexity: SLIDERS[1].target,
        genres: SLIDERS[2].target,
        activities: SLIDERS[3].target,
      };

      const currentUser = user ?? getAuth().currentUser;
      if (!currentUser?.uid) {
        throw new Error("⛔ Geen user.uid — Firebase save wordt overgeslagen.");
      }

      await saveOnboardingDataToFirebase(currentUser.uid, data);

      // Navigate after a short delay
      setTimeout(() => {
        router.replace("/(root)/(tabs)/player");
      }, 1200);
    } catch (error) {
      console.error("Error saving personalization data:", error);
      // Navigate anyway
      router.replace("/(root)/(tabs)/player");
    }
  };

  const renderSlider = (slider: SliderConfig, index: number) => {
    const isActive = index <= currentSliderIndex;
    const isCurrentlyAnimating = index === currentSliderIndex;

    return (
      <Animated.View
        key={slider.id}
        style={{
          opacity: fadeInAnimation,
        }}
        className="mb-6"
      >
        <View className="flex-row items-center mb-4">
          <View className="w-8 h-8 bg-white/20 rounded-full items-center justify-center mr-3">
            <FontAwesome
              name={slider.icon as any}
              size={16}
              color={isActive ? "#fff" : "#bbb"}
            />
          </View>
          <Text className="text-white text-lg font-medium flex-1">
            {slider.label}
          </Text>
          <View
            className={`w-6 h-6 rounded-full border-2 ${
              isActive ? "border-white bg-white" : "border-white/30"
            } items-center justify-center`}
          >
            {isActive && <View className="w-3 h-3 bg-[#2e1448] rounded-full" />}
          </View>
        </View>

        {/* Slider track */}
        <View className="bg-white/20 h-3 rounded-full overflow-hidden">
          <Animated.View
            style={{
              width: sliderAnimations[index].interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            }}
            className="h-full bg-white rounded-full"
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      className="flex-1 justify-center items-center px-6"
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" translucent />

      <View className="w-full max-w-sm">
        {/* Header */}
        <Animated.View
          style={{
            opacity: fadeInAnimation,
          }}
          className="items-center mb-12"
        >
          <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center mb-4">
            <FontAwesome name="cog" size={32} color="#fff" />
          </View>

          <Text className="text-white text-[32px] font-bold text-center mb-1">
            Personalizing
          </Text>
          <Text className="text-gray-300 text-center text-[20px]">
            {onboarding.name ? `${onboarding.name}'s ` : ""}Focus music...
          </Text>
        </Animated.View>

        {/* Sliders Container */}
        <View className="bg-white/10 rounded-2xl p-6 mb-8">
          {SLIDERS.map((slider, index) => renderSlider(slider, index))}
        </View>
      </View>
    </ImageBackground>
  );
}
