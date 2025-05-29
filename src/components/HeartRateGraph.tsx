import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import useHeartRateStore from "@/src/store/heartRateStore";

export default function HeartRateGraph() {
  const hrHistory = useHeartRateStore((s) => s.hrHistory);

  if (!hrHistory || hrHistory.length === 0) {
    return <Text style={styles.emptyText}>No data yet</Text>;
  }

  const latestHR = hrHistory[hrHistory.length - 1];
  const labelInterval = Math.ceil(hrHistory.length / 6);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Current heart-rate: {latestHR}</Text>
      <LineChart
        data={{
          labels: hrHistory.map((_, i) =>
            i % labelInterval === 0 ? `${i}` : ""
          ),
          datasets: [{ data: hrHistory, strokeWidth: 2 }],
        }}
        width={Dimensions.get("window").width - 32}
        height={180}
        withDots={false}
        withShadow={true}
        withInnerLines={true}
        withVerticalLines={false}
        withOuterLines={false}
        chartConfig={{
          // Dark slate background
          backgroundGradientFrom: "#1E293B",
          backgroundGradientTo:   "#1E293B",
          // Cyan-600 fill under curve
          fillShadowGradient:      "#06B6D4",
          fillShadowGradientOpacity: 0.2,
          decimalPlaces: 0,
          // Cyan-600 line
          color: (opacity = 1) => `rgba(6,182,212,${opacity})`,
          // Soft white labels
          labelColor: (opacity = 1) => `rgba(255,255,255,${opacity * 0.7})`,
          propsForBackgroundLines: {
            stroke: "rgba(255,255,255,0.1)",
            strokeDasharray: "3",
          },
        }}
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    padding: 8,
    backgroundColor: "#1E293B",
    borderRadius: 12,
    // drop shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    color: "white",
    textAlign: "center",
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
  chart: {
    borderRadius: 12,
  },
});
