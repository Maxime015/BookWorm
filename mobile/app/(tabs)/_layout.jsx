import React from "react";
import { View, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import { BlurView } from "expo-blur";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: "#B0B0B0",
          tabBarStyle: [
            styles.tabBar,
            {
              bottom: Math.max(insets.bottom - 15, 10),
            },
          ],
          tabBarBackground: () => (
            <BlurView
              intensity={50}
              tint="dark"
              style={[StyleSheet.absoluteFill, styles.blurBackground]}
            />
          ),
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            switch (route.name) {
              case "index":
                iconName = "home-outline";
                break;

              case "create":
                iconName = "add-circle-outline";
                break;

              case "profile":
                iconName = "person-outline";
                break;

              case "explorer":
                iconName = "grid-outline";
                break;
    
              default:
                iconName = "alert-circle-outline";
            }

            return (
              <View style={[styles.iconWrapper, focused && styles.activeIcon]}>
                <Ionicons
                  name={iconName}
                  size={36}
                  color={focused ? "#fff" : "#1A1A1A"}
                />
              </View>
            );
          },
        })}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="create" options={{ title: "Create" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        <Tabs.Screen name="explorer" options={{ title: "Explorer" }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: "10%",
    right: "10%",
    height: 65,
    width: "85%",
    marginHorizontal: "7.5%", // Ajoute un margin horizontal auto
    borderRadius: 40,
    overflow: "hidden", // 👈 nécessaire pour borderRadius avec BlurView
    backgroundColor: "rgba(255,255,255,0.1)", // fallback si BlurView échoue
    paddingHorizontal: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    borderTopWidth: 0,
  },
  blurBackground: {
    borderRadius: 40, // 👈 match the tabBar radius
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    top: 15,
  },
  activeIcon: {
    backgroundColor: COLORS.primary,
  },
});
