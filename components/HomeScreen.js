// HomeScreen.js
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import restaurantCategories from "../items/restaurantCategories";
import restaurants from "../items/resturants";
import ROUTE from "../navigation";

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  // Pull-to-refresh logic
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Render individual category items
  const CategoryItem = ({ name, image }) => (
    <View style={styles.categoryItem}>
      <Image
        source={{ uri: image }}
        style={{ height: 80, width: 100, borderRadius: 10 }}
      />
      <Text>{name}</Text>
    </View>
  );

  // Render individual restaurant items
  const RestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recommendedItem}
      onPress={() =>
        navigation.navigate(ROUTE.HOME.RESTURANTDETAILS, {
          restaurant: item,
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>{item.rating}</Text>
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/022/133/469/non_2x/star-shape-star-icon-yellow-star-in-rating-symbol-free-png.png",
            }}
            style={{ height: 15, width: 15, marginLeft: 5 }}
          />
        </View>
        <Text style={{ fontSize: 15 }}>{item.deliveryTime}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaView>
        {/* Header */}
        <Text style={styles.header}>Order Your Favorite Fast Food!</Text>

        {/* Search Bar and Cart */}
        <View style={styles.topContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search food, drink, desserts"
              style={styles.searchInput}
            />
            <Ionicons
              name="settings-outline"
              size={24}
              color="black"
              style={{ paddingLeft: 10 }}
            />
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate(ROUTE.HOME.BASKET)}
          >
            <Ionicons name="cart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <Text style={{ fontSize: 25, paddingBottom: 12 }}>Cuisines</Text>
        <FlatList
          data={restaurantCategories}
          renderItem={({ item }) => (
            <CategoryItem name={item.categoryName} image={item.categoryImage} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        {/* Recommended Section */}
        <View style={styles.recommendedHeader}>
          <Text style={styles.subHeader}>Recommended For You</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTE.HOME.ALLRECOMMENDATIONS)}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Recommended List (Vertical Scroll) */}
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <RestaurantItem item={item} />}
          contentContainerStyle={styles.recommendedList}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  cartButton: { paddingHorizontal: 10, paddingVertical: 5 },
  categories: { flexDirection: "row", marginBottom: 20 },
  categoryItem: { alignItems: "center", marginRight: 15, paddingBottom: 10 },
  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subHeader: { fontSize: 18, fontWeight: "900" },
  seeAll: { color: "#ffa500" },
  recommendedList: { paddingVertical: 10 },
  recommendedItem: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    width: "100%",
  },
  foodImage: { width: "100%", height: 120 },
  foodInfo: { paddingHorizontal: 10, paddingVertical: "5px" },
  foodName: { fontSize: 16, fontWeight: "bold" },
});
