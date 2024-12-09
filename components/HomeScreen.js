// HomeScreen.js
import React, { useState, useCallback, useEffect } from "react";
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
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import restaurantCategories from "../items/restaurantCategories";
import restaurants from "../items/resturants";
import ROUTE from "../navigation";
import { deleteToken } from "../api/storage";
import { useBasket } from "../context/BasketContext";

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { getItemCount } = useBasket();
  const [loading, setLoading] = useState(true);
  const fadeAnim = new Animated.Value(0.3);
  const slideAnim = new Animated.Value(-100);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Start the combined animations
    Animated.loop(
      Animated.parallel([
        // Fade animation
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        // Slide animation from left
        Animated.sequence([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const RestaurantSkeleton = () => (
    <Animated.View
      style={[
        styles.recommendedItem,
        styles.skeletonContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <View style={styles.skeletonImage} />
      <View style={styles.foodInfo}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonRating} />
        <View style={styles.skeletonDelivery} />
      </View>
    </Animated.View>
  );

  // Filter restaurants based on selected category
  const filteredRestaurants = selectedCategory
    ? restaurants.filter(
        (restaurant) => restaurant.category === selectedCategory
      )
    : restaurants;

  // Pull-to-refresh logic
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setSelectedCategory(null); // Reset filter on refresh
    }, 2000);
  }, []);

  // Render individual category items
  const CategoryItem = ({ name, image }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === name && styles.selectedCategory,
      ]}
      onPress={() => {
        setSelectedCategory(selectedCategory === name ? null : name);
      }}
    >
      <View style={styles.categoryImageContainer}>
        <Image source={{ uri: image }} style={styles.categoryImage} />
      </View>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === name && styles.selectedCategoryText,
        ]}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );

  // Updated RestaurantItem component
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
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/previews/022/133/469/non_2x/star-shape-star-icon-yellow-star-in-rating-symbol-free-png.png",
            }}
            style={styles.starIcon}
          />
        </View>
        <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
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
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.header}>Delicious Food,{"\n"}Delivered To You</Text>

        <View style={styles.topContainer}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#666"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search food, drink, desserts"
              style={styles.searchInput}
              placeholderTextColor="#666"
            />
            <TouchableOpacity onPress={deleteToken}>
              <Ionicons
                name="settings-outline"
                size={24}
                color="#666"
                style={styles.settingsIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate(ROUTE.HOME.BASKET)}
          >
            <View style={styles.cartIconContainer}>
              <Ionicons name="cart-outline" size={24} color="#FF6B6B" />
              {getItemCount() > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{getItemCount()}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Cuisines</Text>
        <FlatList
          data={restaurantCategories}
          renderItem={({ item }) => (
            <CategoryItem name={item.categoryName} image={item.categoryImage} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
        />

        <View style={styles.recommendedHeader}>
          <Text style={styles.subHeader}>
            {selectedCategory
              ? `${selectedCategory} Restaurants`
              : "Recommended For You"}
          </Text>
          {!selectedCategory && (
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTE.HOME.ALLRECOMMENDATIONS)}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={loading ? Array(3).fill({}) : filteredRestaurants}
          renderItem={loading ? RestaurantSkeleton : RestaurantItem}
          keyExtractor={(item, index) =>
            loading ? index.toString() : item.id.toString()
          }
          contentContainerStyle={styles.recommendedList}
          ListEmptyComponent={() => (
            <Text style={styles.noResults}>
              No restaurants found for this cuisine.
            </Text>
          )}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },
  safeArea: {
    padding: 15,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#333",
    lineHeight: 40,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  settingsIcon: {
    marginLeft: 10,
  },
  cartButton: {
    backgroundColor: "#FFF0F0",
    padding: 12,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
    color: "#333",
  },
  categoryList: {
    marginBottom: 25,
  },
  categoryItem: {
    alignItems: "center",
    // marginRight: 15,
    padding: 1,
    backgroundColor: "transparent",
    width: 75,
  },
  categoryImageContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    // padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eaeaea",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryImage: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  selectedCategory: {
    backgroundColor: "transparent",
    transform: [{ scale: 1.05 }],
  },
  selectedCategoryText: {
    color: "#FF6B6B",
  },
  recommendedItem: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 8,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  foodImage: {
    width: "100%",
    height: 180,
  },
  foodInfo: {
    padding: 15,
  },
  foodName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#f8f8f8",
    padding: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  ratingText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FF6B6B",
    marginRight: 4,
  },
  starIcon: {
    height: 16,
    width: 16,
  },
  deliveryTime: {
    fontSize: 14,
    color: "#666",
    backgroundColor: "#f0f0f0",
    padding: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
  },
  seeAll: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "600",
  },
  recommendedList: {
    paddingVertical: 10,
  },
  cartIconContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    right: -6,
    top: -6,
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  skeletonContainer: {
    backgroundColor: "#f0f0f0",
  },
  skeletonImage: {
    width: "100%",
    height: 180,
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
  },
  skeletonTitle: {
    height: 24,
    width: "60%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 12,
  },
  skeletonRating: {
    height: 16,
    width: "30%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonDelivery: {
    height: 16,
    width: "40%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  noResults: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 20,
  },
});

export default HomeScreen;
