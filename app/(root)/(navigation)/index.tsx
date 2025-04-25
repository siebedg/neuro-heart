import HeartRateGraph from "@/components/HeartRateGraph";
import useHeartRateStore from "@/store/heartRateStore";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { Link } from "expo-router";
import { Text, View } from "react-native";

function Index() {
  const hr = useHeartRateStore((state) => state.hr);

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
      <Text> {"\n"}</Text>
      <Text className="text-xl">Current heartrate: {hr}</Text>
      <Text> {"\n"}</Text>
      <Link className="text-xl text-sky-600 underline" href="/profile">
        Profile
      </Link>

      <HeartRateGraph />
    </View>
  );
}

export default ProtectedRoute(Index);
