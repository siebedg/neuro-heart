import { useEffect } from "react";
import startMockHeartRate, {
  MockHeartRateData,
} from "@/src/utils/hr/mockHeartRate";
import useHeartRateStore from "@/src/store/heartRateStore";
import {
  classifyHR,
  resetHeartRateSmoothing,
} from "@/src/utils/hr/hrZoneClassifier";

interface UseMockHeartRateOptions {
  useSmoothing?: boolean;
  baseHeartRate?: number;
}

export default function useMockHeartRate(
  options: UseMockHeartRateOptions = {
    useSmoothing: true,
    baseHeartRate: 130,
  }
) {
  // State management
  const setHr = useHeartRateStore((state) => state.setHr);
  const addHrToHistory = useHeartRateStore((state) => state.addHrToHistory);
  const setCurrentHeartRateData = useHeartRateStore(
    (state) => state.setCurrentHeartRateData
  );

  useEffect(() => {
    resetHeartRateSmoothing();

    const interval = startMockHeartRate((data: MockHeartRateData) => {
      const { heartRate, timestamp } = data;
      setHr(heartRate);
      addHrToHistory(heartRate);

      const zoneInfo = classifyHR(
        heartRate,
        {
          hrRest: 60,
          hrMax: 190,
          age: 35,
          fitnessLevel: "intermediate",
        },
        options.useSmoothing
      );

      setCurrentHeartRateData({
        timestamp,
        heartRate,
        zone: zoneInfo,
      });
    }, options.baseHeartRate ?? 130);

    return () => clearInterval(interval);
  }, [options.useSmoothing, options.baseHeartRate]);

  return null;
}
