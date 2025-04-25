import { useEffect } from "react";
import { logHeartRateToFirestore } from "../services/heartRateService";
import useSessionManager from "./useSessionManager";
import useHeartRateStore from "@/store/heartRateStore";

// Deze hook is klaar voor koppeling met een echte WearOS hartslagsensor
export default function useWearOSHeartRate() {
  const { sessionId } = useSessionManager();
  const setHr = useHeartRateStore((state) => state.setHr);

  useEffect(() => {
    let lastWrite = Date.now();

    // 👇 Hier koppel je later met echte WearOS SDK (via native bridge of module)
    const mockWearOSInterval = setInterval(() => {
      const simulatedHr = 70 + Math.floor(Math.random() * 10); // 🔁 Simulatie → vervang later
      setHr(simulatedHr);

      const now = Date.now();
      if (now - lastWrite >= 5000) {
        logHeartRateToFirestore(simulatedHr, "wearos", sessionId ?? undefined);
        lastWrite = now;
      }
    }, 1000); // Je zou hier in real use-case een event-listener hebben

    return () => clearInterval(mockWearOSInterval); // 🔁 Vervang met echte unsubscribe-functie
  }, []);

  return null;
}
