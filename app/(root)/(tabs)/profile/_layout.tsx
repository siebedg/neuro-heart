import { Slot, Stack } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";

export default function ProfileLayout() {
  return (
    <ImageBackground
      source={require("../../../../assets/images/background.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <Stack
        screenOptions={{
          headerShown: true,
          title: "",
          headerTransparent: true,
          headerShadowVisible: false,
          headerTintColor: "white",
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
});
