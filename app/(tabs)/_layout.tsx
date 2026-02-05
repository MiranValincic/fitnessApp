import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const primaryColor = "#78A481";
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: primaryColor },
        headerTitleAlign: "center",
        headerShadowVisible: false,
        tabBarStyle: { borderTopColor: primaryColor, borderTopWidth: 0, elevation: 0, shadowOpacity: 0 },
        tabBarInactiveTintColor: primaryColor,
        tabBarActiveTintColor: primaryColor,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "4-Weeks Fitness Program",
          tabBarIcon: ({ color }) => <Ionicons name="fitness" size={24} color={primaryColor} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size }) => <Feather name="user" size={24} color={primaryColor} />,
        }}
      />
      <Tabs.Screen
        name="aiVideos"
        options={{
          title: "AI Videos",
          tabBarIcon: ({ size }) => <AntDesign name="open-ai" size={24} color={primaryColor} />,
        }}
      />
    </Tabs>
  );
}
