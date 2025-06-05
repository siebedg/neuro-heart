import useHeartRateStore from "@/src/store/heartRateStore";
import { Link } from "expo-router";
import { View } from "react-native";

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

      <Link className="text-xl text-sky-600 underline" href="/home/nested-home">
        Nested Home
      </Link>
    </View>
  );
}

export default Index;
