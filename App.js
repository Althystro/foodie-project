import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthNav from "./navigation/AuthNav/AuthNav";
import UserContext from "./context/UserContext";
import { getToken } from "./api/storage";
import { BasketProvider } from "./context/BasketContext";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setUser(true);
    }
  };
  useEffect(() => {
    checkToken();
  });

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={[user, setUser]}>
          <BasketProvider>{user ? <MainNav /> : <AuthNav />}</BasketProvider>
        </UserContext.Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
