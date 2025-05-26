import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./config";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";


// This should be at the top level of your file, not inside the hook
WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({
  native: "com.neuroheart.neuroheart:/oauthredirect",
});

export function useGoogleAuth() {
  // Try using useIdTokenAuthRequest instead
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "583445886660-9tnmvuvgtcjf7rjit8jqhiejf5fob76o.apps.googleusercontent.com", 
    scopes: ["profile", "email"],
    redirectUri: redirectUri,
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