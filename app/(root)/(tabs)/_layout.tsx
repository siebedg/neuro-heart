import { Slot, Tabs } from "expo-router";
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
            headerStyle: {
              backgroundColor: "transparent",
              elevation: 0, 
              shadowOpacity: 0, 
            },
            headerTitleStyle: {
              color: "#fff", 
            },
            tabBarIcon: ({ color, size }) => (
              <FontAwesome size={size} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
           options={{
            title: "Profile",
            headerTransparent: true,
            headerStyle: {
              backgroundColor: "transparent",
              elevation: 0, 
              shadowOpacity: 0, 
            },
            headerTitleStyle: {
              color: "#fff", 
            },
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-alt" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerTransparent: true,
            headerStyle: {
              backgroundColor: "transparent",
              elevation: 0, 
              shadowOpacity: 0, 
            },
            headerTitleStyle: {
              color: "#fff", 
            },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings-sharp" size={size} color={color} />
            ),
          }}
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
