import useMockHeartRate from "@/app/utils/useMockHeartRate";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const hr = useMockHeartRate();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-3xl text-cyan-800 text-center">
        Live, laugh, love.
      </Text>
      <Text className="text-xl">Current heartrate: {hr}</Text>
      <Text> {"\n"}</Text>
      <Link className="text-sky-600 underline" href="/profile">
        Profile
      </Link>
    </View>
  );
}
