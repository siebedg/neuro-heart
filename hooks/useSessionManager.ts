import { useState } from "react";
import { startSession, endSession } from "../services/sessionService";
import useHeartRateStore from "@/store/heartRateStore";

export default function useSessionManager() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const resetHr = useHeartRateStore((s) => s.resetSession); 

  const begin = async (goal: string) => {
    const id = await startSession(goal);
    if (id) setSessionId(id);
  };

  const end = async () => {
    if (sessionId) {
      await endSession(sessionId);
      resetHr();
      setSessionId(null);
    }
  };

  return { sessionId, begin, end, isActive: !!sessionId };
}
