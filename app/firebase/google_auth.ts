import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./config";
import * as WebBrowser from "expo-web-browser";

// This should be at the top level of your file, not inside the hook
WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  // Try using useIdTokenAuthRequest instead
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "996077008770-v4aev74qcu40e24sc0ruamd0ssbd1hh5.apps.googleusercontent.com", // Use Web Client ID from Firebase
    scopes: ["profile", "email"],
  });

  useEffect(() => { 
    if (response?.type === "success") {
      // For useIdTokenAuthRequest, the token is in response.params
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch(console.error);
    }
  }, [response]);

  return {
    handleGoogleLogin: () => promptAsync(),
    request,
  };
}