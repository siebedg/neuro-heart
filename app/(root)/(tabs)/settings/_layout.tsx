import { Slot } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";

export default function SettingsLayout() {
  return (
    <ImageBackground
      source={require("../../../../assets/images/background.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <Slot screenOptions={{ headerShown: false }} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
});
