import { Stack } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";

export default function HomeLayout() {
  return (
    <ImageBackground
      source={require("../../../../assets/images/background.png")}
      style={styles.bg}
    >
      <Stack
        screenOptions={{
          headerShown: false,
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
    resizeMode: "cover",
  },
});
