// app/firebase/firestore.ts
import { getFirestore } from "firebase/firestore";
import { app } from "./config";

// Export Firestore instance
export const db = getFirestore(app);
