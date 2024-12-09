import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import HomeScreen from "../../components/HomeScreen";
import AllRecommendationsScreen from "../../components/AllRecommendationsScreen";
import RestaurantDetailsScreen from "../../components/RestaurantDetailsScreen";
import FoodDetail from "../../components/FoodDetail";
import BasketScreen from "../../components/BasketScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";

const Stack = createStackNavigator();
const HomeNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="All Recommendations"
        component={AllRecommendationsScreen}
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
      <Stack.Screen
        name="Restaurant Details"
        component={RestaurantDetailsScreen}
        options={({ navigation }) => ({
          title: "Menu",
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
      <Stack.Screen
        name="Food Details"
        component={FoodDetail}
        options={({ navigation }) => ({
          title: "Details",
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
      <Stack.Screen
        name="Basket"
        component={BasketScreen}
        options={({ navigation }) => ({
          title: "My Basket",
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

export default HomeNav;

const styles = StyleSheet.create({});
