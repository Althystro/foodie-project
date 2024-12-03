// App.js
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "./components/HomeScreen";
import AllRecommendationsScreen from "./components/AllRecommendationsScreen";
import { NavigationContainer } from "@react-navigation/native";
import RestaurantDetailsScreen from "./components/RestaurantDetailsScreen";
import FoodDetail from "./components/FoodDetail";
import Basket from "./components/Basket";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllRecommendations"
          component={AllRecommendationsScreen}
          options={{ title: "All Recommendations" }}
        />
        <Stack.Screen
          name="RestaurantDetails"
          component={RestaurantDetailsScreen}
          options={{ title: "Menu" }}
        />
        <Stack.Screen
          name="FoodDetails"
          component={FoodDetail}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="Basket"
          component={Basket}
          options={{ title: "Basket" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// import { StatusBar } from "expo-status-bar";
// import { SafeAreaView, StyleSheet, Text, View } from "react-native";
// import SignUp from "./components/Signin";
// import Login from "./components/Login";
// import HomeScreen from "./components/HomeScreen";

// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* <SignUp /> */}
//       {/* <Login /> */}
//       <HomeScreen />
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
