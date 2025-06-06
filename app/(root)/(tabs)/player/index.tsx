import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import useHeartRateStore from "@/src/store/heartRateStore";
import { FontAwesome } from "@expo/vector-icons";

export default function Player() {
  const hr = useHeartRateStore((s) => s.hr || 97); // fallback for demo

  const zoneMessage = hr < 100 ? "Zone state too low" : "Ready to focus";

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      style={styles.bg}
    >
      <View style={styles.container}>
        {/* HR Display */}
        <View style={styles.heartCircle}>
          <Text style={styles.hrText}>
            {hr}
            <FontAwesome name="heart" size={20} color="#f87171" />
          </Text>
          <Text style={styles.bpmText}>bpm</Text>
        </View>

        {/* Zone Status */}
        <Text style={styles.zoneText}>{zoneMessage}</Text>

        {/* Dots (optional page indicator) */}
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={styles.dotActive} />
          <View style={styles.dot} />
        </View>

        {/* Start Session Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start session</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heartCircle: {
    borderWidth: 4,
    borderColor: "#a78bfa",
    borderRadius: 200,
    padding: 32,
    marginBottom: 24,
  },
  hrText: {
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
    flexDirection: "row",
    textAlign: "center",
  },
  bpmText: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
  },
  zoneText: {
    color: "white",
    fontSize: 18,
    marginTop: 16,
  },
  dots: {
    flexDirection: "row",
    marginTop: 24,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#888",
    margin: 4,
  },
  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#fff",
    margin: 4,
  },
  button: {
    backgroundColor: "#ede9fe",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  buttonText: {
    color: "#6b21a8",
    fontWeight: "600",
    fontSize: 16,
  },
});
