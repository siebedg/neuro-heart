import { useEffect, useState } from "react";
import startMockHeartRate from "../utils/mockHeartRate"; // Later dit vervangen naar een WearOS hook
import { logHeartRateToFirestore } from "../services/heartRateService";
import useSessionManager from "./useSessionManager"; 

export default function useMockHeartRate() {
  const { sessionId } = useSessionManager();
  const [hr, setHr] = useState(75);

  useEffect(() => {
    let lastWrite = Date.now();

    // Later dit vervangen naar een WearOS listener
    const interval = startMockHeartRate((newHr) => {
      setHr(newHr);

      const now = Date.now();
      if (now - lastWrite >= 5000) {
        logHeartRateToFirestore(newHr, "mock", sessionId ?? undefined);
        lastWrite = now;
      }
    });

    return () => clearInterval(interval); // Bij WearOS hier een unsubscribe-functie aanroepen
  }, []);

  return hr;
}
