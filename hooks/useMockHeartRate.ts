import { useEffect } from "react";
import startMockHeartRate from "../utils/mockHeartRate"; // Later dit vervangen naar een WearOS hook
import { logHeartRateToFirestore } from "../services/heartRateService";
import useSessionManager from "./useSessionManager";
import useHeartRateStore from "@/store/heartRateStore";

export default function useMockHeartRate() {
  const { sessionId } = useSessionManager();
  const setHr = useHeartRateStore((state) => state.setHr);
  const addHrToHistory = useHeartRateStore((state) => state.addHrToHistory);

  useEffect(() => {
    let lastWrite = Date.now();

    // Later dit vervangen naar een WearOS listener
    const interval = startMockHeartRate((newHr) => {
      setHr(newHr);
      addHrToHistory(newHr);

      const now = Date.now();
      if (now - lastWrite >= 5000) {
        logHeartRateToFirestore(newHr, "mock", sessionId ?? undefined);
        lastWrite = now;
      }
    });

    return () => clearInterval(interval); // Bij WearOS hier een unsubscribe-functie aanroepen
  }, []);

  return null;
}
