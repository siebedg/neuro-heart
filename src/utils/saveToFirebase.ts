import { getFirestore, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

export const saveOnboardingDataToFirebase = async (
  uid: string,
  data: {
    useCase: string | null;
    intent: string | null;
    name: string;
    neuralEffect: number;
    complexity: number;
  }
) => {
  try {
    await setDoc(doc(db, "users", uid), {
      ...data,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
    console.log("✅ Onboarding data saved to Firebase.");
  } catch (err) {
    console.error("❌ Failed to save onboarding data:", err);
    throw err;
  }
};
