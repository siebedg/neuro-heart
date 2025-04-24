import { useState } from "react";
import { startSession, endSession } from "../services/sessionService";

export default function useSessionManager() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  const begin = async (goal: string) => {
    const id = await startSession(goal);
    if (id) setSessionId(id);
  };

  const end = async () => {
    if (sessionId) {
      await endSession(sessionId);
      setSessionId(null);
    }
  };

  return { sessionId, begin, end, isActive: !!sessionId };
}
