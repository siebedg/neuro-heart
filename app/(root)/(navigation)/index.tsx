import useMockHeartRate from "@/hooks/useMockHeartRate";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { Link } from "expo-router";
import { Text, View } from "react-native";

function Index() {
  const hr = useMockHeartRate();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Text className="text-5xl font-bold text-cyan-600 mb-8 tracking-tight">
      Cortune
    </Text>
      <Text className="text-3xl text-cyan-800 text-center">
        Live, laugh, love.
      </Text>
      <Text> {"\n"}</Text>
      <Text className="text-xl">Current heartrate: {hr}</Text>
      <Text> {"\n"}</Text>
      <Link className="text-xl text-sky-600 underline" href="/profile">
        Profile
      </Link>
    </View>
  );
}

export default ProtectedRoute(Index)
