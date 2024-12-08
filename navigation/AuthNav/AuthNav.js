import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Login from "../../auth/Login";
import Register from "../../auth/Signup";
import SignUp from "../../auth/Signup";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";

const Stack = createStackNavigator();

const AuthNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "transparent",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUp}
        options={({ navigation }) => ({
          title: "All Restaurants",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                size={24}
                color="#000"
                style={{ marginLeft: 15 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthNav;

const styles = StyleSheet.create({});
