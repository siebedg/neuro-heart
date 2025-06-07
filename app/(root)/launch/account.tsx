import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity, 
  ImageBackground,
  Image,
} from "react-native";
import { useGoogleAuth } from "@/src/firebase/google_auth";
import GoogleIcon from "@/src/components/GoogleIcon";

export default function AccountScreen() {
  const router = useRouter();
  const { handleGoogleLogin } = useGoogleAuth();

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      className="flex-1 justify-center items-center px-6"
      resizeMode="cover"
    >
      <View className="w-full max-w-sm">
        {/* Header image */}
        <Image
          source={require("@/assets/images/onboarding-header.png")} // Placeholder, voeg zelf toe
          className="w-full h-40 mb-6 rounded-x"
          resizeMode="contain"
        />

        <Text className="text-white text-[28px] font-bold text-center mb-2">
          Set up your account
        </Text>
        <Text className="text-gray-300 text-center text-base mb-10">
          Save your sessions, track intent history & sync across devices.
        </Text>

        {/* Google login */}
        <TouchableOpacity
          onPress={handleGoogleLogin}
          className="bg-white/10 py-4 rounded-full w-full flex-row justify-center items-center mb-6"
        >
          <GoogleIcon size={24} />
          <Text className="text-white text-base font-medium ml-3">
            Sign in with Google
          </Text>
        </TouchableOpacity>

        {/* Email sign in */}
        <TouchableOpacity
          onPress={() => router.push("/register/name")}
          className="bg-white/10 py-4 rounded-full w-full flex-row justify-center items-center"
        >
          <Text className="text-white text-base font-medium">
            Sign in with Email
          </Text>
        </TouchableOpacity>

        {/* Skip for now */}
        <TouchableOpacity onPress={() => router.push("/launch/sliders")}>
          <Text className="text-white/60 text-center text-base mt-10 underline">
            Continue without account
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
