// import useHeartRateStore from "@/src/store/heartRateStore";
// import { Link } from "expo-router";
// import { View } from "react-native";

// function Index() {
//   const hr = useHeartRateStore((state) => state.hr);

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >

//       <Link className="text-xl text-sky-600 underline" href="/home/nested-home">
//         Nested Home
//       </Link>
//     </View>
//   );
// }

// export default Index;

import { Link } from "expo-router";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function Index() {
  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      className="flex-1 px-6 py-12"
    >
      <View className="flex-1 justify-between">
        {/* Header */}
        <View className="mt-6">
          <Text className="text-white text-3xl font-bold mb-2">🎯 Today's Goal</Text>
          <Text className="text-gray-200 text-base">
            Focus & Flow – planned deep work session.
          </Text>
        </View>

        {/* Main Action */}
        <View className="items-center">
          <TouchableOpacity className="bg-white/10 p-8 rounded-full border-2 border-white/30">
            <FontAwesome name="play" size={32} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white mt-4 text-lg">Start Session</Text>
        </View>

        {/* Status Overview */}
        <View className="space-y-4">
          <View className="bg-white/10 p-4 rounded-2xl">
            <Text className="text-white text-base">HRV Trend: +4%</Text>
          </View>
          <View className="bg-white/10 p-4 rounded-2xl">
            <Text className="text-white text-base">Last session: 32 min - Focus</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Index;
