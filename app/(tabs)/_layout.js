import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "../../components/navigation/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Games",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "game-controller" : "game-controller-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="score"
        options={{
          title: "High Score",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "analytics" : "analytics-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
