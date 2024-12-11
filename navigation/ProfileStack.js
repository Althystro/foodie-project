import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyProfile from "../auth/MyProfile";
import PastOrders from "../auth/PastOrders";

const Stack = createStackNavigator();

const ProfileNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#f5f5f5" },
      }}
    >
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="PastOrders" component={PastOrders} />
    </Stack.Navigator>
  );
};

export default ProfileNav;
