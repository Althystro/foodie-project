import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "./components/HomeScreen";
import AllRecommendationsScreen from "./components/AllRecommendationsScreen";
import { NavigationContainer } from "@react-navigation/native";
import RestaurantDetailsScreen from "./components/RestaurantDetailsScreen";
import FoodDetail from "./components/FoodDetail";
import Basket from "./components/Basket";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import HomeNav from "./navigation/Home/HomeNav";
import MainNav from "./navigation/MainNav/MainNav";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <MainNav />
      {/* <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#fff",
            shadowColor: "transparent", // Remove shadow on iOS
            // elevation: 0, // Remove shadow on Android
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
          name="AllRecommendations"
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
          name="RestaurantDetails"
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
          name="FoodDetails"
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
          component={Basket}
          options={({ navigation }) => ({
            title: "Basket",
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
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default App;
