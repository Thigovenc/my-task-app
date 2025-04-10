import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import AddTaskScreen from "../screens/AddTaskScreen";
import { Ionicons } from "@expo/vector-icons"; // ícones da tab bar

export type RootTabParamList = {
  Home: undefined;
  AddTask: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === "Home") {
              iconName = "list";
            } else if (route.name === "AddTask") {
              iconName = "add-circle-outline";
            } else {
              iconName = "help-circle";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Minhas Tarefas" }}
        />
        <Tab.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{ title: "Nova Tarefa" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
