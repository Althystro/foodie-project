// HomeScreen.js
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
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
import ROUTE from "../navigation";
import { deleteToken } from "../api/storage";
import { useBasket } from "../context/BasketContext";
import * as Font from "expo-font";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllResturants } from "../api/resturants";
import UserContext from "../context/UserContext";
import { Alert } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { getItemCount } = useBasket();
  const [loading, setLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const fadeAnim = new Animated.Value(0.3);
  const slideAnim = new Animated.Value(-100);
  const basketCount = getItemCount();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    deleteToken();
    setUser(false);
  };
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: logout,
        style: "destructive",
      },
    ]);
  };

  const { data: restaurants, isLoading: isLoadingRestaurants } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getAllResturants,
  });
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Righteous: require("../assets/fonts/Righteous-Regular.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
    setTimeout(() => {
      setLoading(false);
    }, 1500);

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

  // Add debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Memoize filtered restaurants
  const filteredRestaurants = useMemo(() => {
    if (!restaurants) return [];

    return restaurants.filter((restaurant) => {
      const matchesCategory = selectedCategory
        ? restaurant.category.name === selectedCategory
        : true;

      const matchesSearch = restaurant.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, debouncedSearch, restaurants]);

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
      key={item._id}
      style={styles.recommendedItem}
      onPress={() =>
        navigation.navigate(ROUTE.HOME.RESTURANTDETAILS, {
          restaurant: {
            ...item,
            menuItems: item.items,
          },
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

  // Update the loading condition to include query loading state
  const isLoading = loading || isLoadingRestaurants;

  return (
    <FlatList
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={() => (
        <>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
              <Text style={styles.header}>Vroom</Text>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
              >
                <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchBasketContainer}>
              <View style={styles.searchContainer}>
                <Ionicons
                  name="search-outline"
                  size={20}
                  color="#666"
                  style={styles.searchIcon}
                />
                <TextInput
                  placeholder="Search for restaurants..."
                  style={styles.searchInput}
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  returnKeyType="search"
                  clearButtonMode="while-editing"
                />
              </View>

              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => navigation.navigate(ROUTE.HOME.BASKET)}
              >
                <View style={styles.cartIconContainer}>
                  <Ionicons name="cart-outline" size={24} color="#FF6B6B" />
                  {basketCount > 0 && (
                    <View style={styles.cartBadge}>
                      <Text style={styles.cartBadgeText}>{basketCount}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Cuisines</Text>
            <FlatList
              data={
                isLoadingCategories
                  ? Array(4)
                      .fill({})
                      .map((_, index) => ({ id: `skeleton-${index}` }))
                  : categories
              }
              renderItem={({ item }) =>
                isLoadingCategories ? (
                  <View style={styles.categoryItem} key={`skeleton-${item.id}`}>
                    <View
                      style={[
                        styles.categoryImageContainer,
                        { backgroundColor: "#e0e0e0" },
                      ]}
                    />
                    <View
                      style={{
                        height: 13,
                        width: 50,
                        backgroundColor: "#e0e0e0",
                        borderRadius: 4,
                      }}
                    />
                  </View>
                ) : (
                  <CategoryItem
                    name={item.name}
                    image={item.image}
                    key={item._id}
                  />
                )
              }
              keyExtractor={(item) =>
                isLoadingCategories
                  ? `skeleton-${item.id}`
                  : item._id.toString()
              }
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
                  onPress={() =>
                    navigation.navigate(ROUTE.HOME.ALLRECOMMENDATIONS)
                  }
                >
                  <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
              )}
            </View>
          </SafeAreaView>
        </>
      )}
      data={
        isLoading
          ? Array(3)
              .fill({})
              .map((_, index) => ({ id: `skeleton-${index}` }))
          : filteredRestaurants
      }
      renderItem={({ item }) =>
        isLoading ? (
          <RestaurantSkeleton key={`skeleton-${item.id}`} />
        ) : (
          <RestaurantItem item={item} key={item._id} />
        )
      }
      keyExtractor={(item) =>
        isLoading ? `skeleton-${item.id}` : item._id.toString()
      }
      contentContainerStyle={styles.recommendedList}
      ListEmptyComponent={() => (
        <Text style={styles.noResults}>
          No restaurants found for this cuisine.
        </Text>
      )}
    />
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    paddingTop: 10,
    paddingRight: 5,
    fontFamily: "Righteous",
  },
  header: {
    fontSize: 48,
    fontFamily: "Righteous",
    color: "#FF6B6B",
    fontWeight: "bold",
  },
  logoutButton: {
    padding: 8,
    position: "absolute",
    right: 0,
    top: 15,
  },
  searchBasketContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "#eaeaea",
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
    borderWidth: 1,
    borderColor: "#FFE5E5",
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
