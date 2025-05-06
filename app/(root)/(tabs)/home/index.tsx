import HeartRateGraph from "@/src/components/HeartRateGraph";
// import useProtectedRoute from "@/hooks/useProtectedRoute";
import useHeartRateStore from "@/src/store/heartRateStore";
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
      <Link className="text-xl text-sky-600 underline" href="/home/nested-home">
        Nested Home
      </Link>
      <HeartRateGraph />
    </View>
  );
}

export default Index;
