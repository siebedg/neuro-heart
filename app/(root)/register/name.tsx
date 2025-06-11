import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { router, Stack } from "expo-router";

export default function RegisterNameScreen() {
  const [name, setName] = useState("");
  const isValidName = name.trim().length >= 2;

  const handleContinue = () => {
    if (isValidName) {
      router.push({
        pathname: "/register/age",
        params: { name },
      });
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerTransparent: true,
          headerShadowVisible: false,
          headerTintColor: "white", // witte back-arrow
        }}
      />

      <ImageBackground
        source={require("@/assets/images/background.png")}
        className="flex-1 justify-center items-center px-6"
        resizeMode="cover"
      >
        <View className="w-full max-w-sm">
          <Text className="text-white text-[32px] font-bold text-center mb-10">
            What is your name?
          </Text>
          {/* Input */}
          <View className="bg-white/10 rounded-3xl mb-6 overflow-hidden">
            <TextInput
              className="text-white px-4 py-4 text-lg"
              placeholder="Enter your name"
              placeholderTextColor="#bbb"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!isValidName}
            className={`py-4 rounded-full ${
              isValidName ? "bg-white" : "bg-white/20"
            }`}
          >
            <Text
              className={`text-center font-semibold text-base ${
                isValidName ? "text-black" : "text-white/50"
              }`}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}
