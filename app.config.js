import "dotenv/config";

export default {
  expo: {
    name: "Cortune",
    slug: "neuro-heart",
    owner: "jojoh",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/latest-icon.png",
    scheme: "com.neuroheart.neuroheart",
    userInterfaceStyle: "automatic",
    assetBundlePatterns: ["**/*"],
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.neuroheart.neuroheart",
      adaptiveIcon: {
        foregroundImage: "./assets/images/latest-icon.png",
        backgroundColor: "#ffffff",
      },
      fonts: [
        {
          fontFamily: "Inter",
          fontDefinitions: [
            {
              path: "./assets/fonts/Poppins-Regular.ttf",
            },
            {
              path: "./assets/fonts/Poppins-BoldItalic.ttf",
              weight: 700,
              style: "italic",
            },
            {
              path: "./assets/fonts/Poppins-Bold.ttf",
              weight: 700,
            },
          ],
        },
      ],
    },
    androidStatusBar: {
      barStyle: "light-content",
      translucent: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash.png",
          imageWidth: 200,
          resizeMode: "cover",
          backgroundColor: "#432765",
        },
      ],
      [
        "expo-font",
        {
          fonts: ["./assets/fonts/Poppins-Regular.ttf"],
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      eas: {
        projectId: "6891b6ad-3347-4a2f-8462-ac0f6871baf2",
      },
    },
  },
};
