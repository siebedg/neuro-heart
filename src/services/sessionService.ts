import { db } from "@/src/firebase/firestore";
import { auth } from "../firebase/config";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";

export async function startSession(goal: string): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const docRef = await addDoc(collection(db, "sessions"), {
      userId: user.uid,
      startedAt: serverTimestamp(),
      endedAt: null,
      goal: goal,
    });
    return docRef.id;
  } catch (error) {
    console.error("Fout bij startSession:", error);
    return null;
  }
}

export async function endSession(sessionId: string) {
  const sessionRef = doc(db, "sessions", sessionId);
  try {
    await updateDoc(sessionRef, {
      endedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Fout bij endSession:", error);
  }
}
