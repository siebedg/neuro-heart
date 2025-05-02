import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

const NestedHome = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-3xl text-cyan-600 text-center">Nested Home </Text>
      <Button title="Go back" onPress={() => router.back()} color="#0891b2" />
    </View>
  );
};

export default NestedHome;
