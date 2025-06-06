import { Slot, Stack } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";

export default function HomeLayout() {
  return (
    <ImageBackground
      source={require("../../../../assets/images/background.png")}
      style={styles.bg}
    >
      <Slot screenOptions={{ headerShown: false }} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
  },
});