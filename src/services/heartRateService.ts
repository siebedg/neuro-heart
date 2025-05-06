import { db } from "@/src/firebase/firestore";
import { auth } from "../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function logHeartRateToFirestore(
    hr: number,
    source: "mock" | "wearos" | "googleFit",
    sessionId?: string
  ) {
    const user = auth.currentUser;
    if (!user) return;
  
    const docData: any = {
      userId: user.uid,
      value: hr,
      timestamp: serverTimestamp(),
      source: source,
    };
  
    if (sessionId) {
      docData.sessionId = sessionId;
    }
  
    try {
      await addDoc(collection(db, "heartrates"), docData);
    } catch (error) {
      console.error("Fout bij schrijven HR naar Firestore:", error);
    }
  }
  