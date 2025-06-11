import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { ImageBackground, StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.bg}
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#ffffff",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
            elevation: 0,
            position: "absolute",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerTransparent: true,
            headerShown: false,
            headerStyle: {
              backgroundColor: "transparent",
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleStyle: {
              color: "#fff",
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons size={size} name="home-sharp" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="player"
          options={{
            title: "Player",
            headerTransparent: true,
            headerShown: false,
            headerStyle: {
              backgroundColor: "transparent",
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleStyle: {
              color: "#fff",
            },
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="music" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false, // ✅ zet dit op false voor custom UI
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-alt" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{ headerShown: false, href: null }}
        />
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
  },
});
