import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { auth } from "@/src/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterVerifyScreen() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { name, email, password, expectedCode } = useLocalSearchParams<{
    name: string;
    email: string;
    password: string;
    expectedCode: string;
  }>();

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Focus next
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleComplete = async () => {
    const enteredCode = code.join("");
    if (enteredCode !== expectedCode) {
      Alert.alert("Invalid code", "Please try again.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        email as string,
        password as string
      );
      Alert.alert("Success", "Account created!");
      router.replace("/launch/sliders");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  const isCodeComplete = code.every((c) => c.length === 1);

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
        className="flex-1 justify-center items-center px-6"
        resizeMode="cover"
      >
        <View className="w-full max-w-sm">
          <Text className="text-white text-[28px] font-bold text-center mb-4">
            Verification code
          </Text>
          <Text className="text-white/70 text-center mb-8">
            Code sent to {email}
          </Text>

          {/* Code boxes */}
          <View className="flex-row justify-between mb-8">
            {code.map((digit, i) => (
              <TextInput
                key={i}
                ref={(ref) => (inputRefs.current[i] = ref)}
                value={digit}
                onChangeText={(value) => handleChange(value, i)}
                keyboardType="number-pad"
                maxLength={1}
                className="bg-white/10 text-white text-center text-xl rounded-xl w-12 h-14"
              />
            ))}
          </View>

          {/* Continue button */}
          <TouchableOpacity
            onPress={handleComplete}
            disabled={!isCodeComplete}
            className={`py-4 rounded-full ${
              isCodeComplete ? "bg-white" : "bg-white/20"
            }`}
          >
            <Text
              className={`text-center font-semibold text-base ${
                isCodeComplete ? "text-black" : "text-white/50"
              }`}
            >
              Next
            </Text>
          </TouchableOpacity>

          {/* Optional resend */}
          <Text className="text-white/50 text-center mt-6">
            Send code again (2:58)
          </Text>
        </View>
      </ImageBackground>
    </>
  );
}
