import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNav from "../Home/HomeNav";
import AuthNav from "../AuthNav/AuthNav";
import Entypo from "@expo/vector-icons/Entypo";
import MyProfile from "../../auth/MyProfile";

const Tab = createBottomTabNavigator();
const MainNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4A3428",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tab.Screen
        name="Main"
        component={HomeNav}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Auth"
        component={MyProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNav;

const styles = StyleSheet.create({});
