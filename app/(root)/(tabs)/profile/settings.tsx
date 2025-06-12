import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/src/firebase/config";
import { router, Stack } from "expo-router";
import { Ionicons, MaterialIcons, Feather, Entypo } from "@expo/vector-icons";

export default function SettingsScreen() {
  const [useMockHR, setUseMockHR] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (err: any) {
      Alert.alert("Logout error", err.message);
    }
  };

  const SettingRow = ({
    title,
    subtitle,
    onPress,
    right,
    icon,
    iconColor = "#fff",
    danger = false,
  }: {
    title: string;
    subtitle?: string;
    onPress?: () => void;
    right?: React.ReactNode;
    icon: React.ReactNode;
    iconColor?: string;
    danger?: boolean;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      className={`flex-row justify-between items-center p-4 bg-white/10 border border-white/15 rounded-xl mb-2 ${
        danger ? "border-red-400 bg-red-500/10" : ""
      }`}
    >
      <View className="flex-row items-center">
        <View className="mr-4">{icon}</View>
        <View>
          <Text
            className={`font-semibold text-base ${
              danger ? "text-red-400" : "text-white"
            }`}
          >
            {title}
          </Text>
          {subtitle && (
            <Text className="text-white/60 text-sm mt-1">{subtitle}</Text>
          )}
        </View>
      </View>
      {right ?? (
        <Text className={`${danger ? "text-red-400" : "text-white/40"}`}></Text>
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "",
          headerTransparent: true,
          headerShadowVisible: false,
          headerTintColor: "white", // witte back-arrow
        }}
      />
      <ImageBackground
        source={require("@/assets/images/background.png")}
        className="flex-1 justify-center px-6 pt-16 pb-20"
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          {/* SECTION: Account */}
          <Text className="text-white/60 text-xs mb-2">ACCOUNT</Text>
          <SettingRow
            title="Profile"
            subtitle="Manage your name and data"
            icon={<Ionicons name="person-outline" size={22} color="#fff" />}
          />
          <SettingRow
            title="Privacy"
            subtitle="Control data usage & permissions"
            icon={
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color="#fff"
              />
            }
          />

          {/* SECTION: Preferences */}
          <Text className="text-white/60 text-xs mt-6 mb-2">PREFERENCES</Text>
          <SettingRow
            title="Use Mock Heart Rate"
            icon={<Feather name="activity" size={22} color="#fff" />}
            right={
              <Switch
                value={useMockHR}
                onValueChange={setUseMockHR}
                thumbColor={useMockHR ? "#fff" : "#888"}
                trackColor={{ false: "#444", true: "#999" }}
              />
            }
          />
          <SettingRow
            title="Theme"
            subtitle="Dark"
            icon={<Ionicons name="moon" size={20} color="#fff" />}
          />
          <SettingRow
            title="Units"
            subtitle="Metric"
            icon={<MaterialIcons name="straighten" size={22} color="#fff" />}
          />

          {/* SECTION: About */}
          <Text className="text-white/60 text-xs mt-6 mb-2">ABOUT</Text>
          <SettingRow
            title="Feedback"
            icon={<Feather name="star" size={20} color="#fff" />}
          />
          <SettingRow
            title="FAQ"
            icon={<Feather name="help-circle" size={20} color="#fff" />}
          />
          <SettingRow
            title="Privacy Policy"
            icon={<Feather name="file-text" size={20} color="#fff" />}
          />
          <SettingRow
            title="Terms of Service"
            icon={<Feather name="book" size={20} color="#fff" />}
          />
          <SettingRow
            title="App Version"
            subtitle="Cortune v1.0.0"
            right={null}
            icon={<Entypo name="info-with-circle" size={20} color="#fff" />}
          />

          {/* SECTION: Logout */}
          <View className="mt-8">
            <SettingRow
              title="Log out"
              onPress={handleLogout}
              icon={<Feather name="log-out" size={20} color="#f87171" />}
              danger
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
}
