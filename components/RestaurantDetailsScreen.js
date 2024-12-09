import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ROUTE from "../navigation";

const RestaurantDetailsScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const [loading, setLoading] = useState(true);
  const fadeAnim = new Animated.Value(0.3);
  const slideAnim = new Animated.Value(-100);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 1000);

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

  const MenuItemSkeleton = () => (
    <Animated.View
      style={[
        styles.menuItemContainer,
        styles.skeletonContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <View style={styles.menuItem}>
        <View style={styles.menuInfo}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonDescription} />
          <View style={styles.skeletonPrice} />
        </View>
        <View style={[styles.imageContainer, styles.skeletonImage]} />
      </View>
    </Animated.View>
  );

  const RestaurantHeader = () => (
    <View style={styles.headerContainer}>
      <Image source={{ uri: restaurant.image }} style={styles.headerImage} />
      <View style={styles.headerOverlay}>
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
            <Ionicons name="star" size={16} color="#FFD700" />
          </View>
          <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.menuItemContainer}
      onPress={() =>
        navigation.navigate(ROUTE.HOME.FOODDETAILS, { food: item })
      }
    >
      <View style={styles.menuItem}>
        <View style={styles.menuInfo}>
          <Text style={styles.menuName}>{item.name}</Text>
          <Text style={styles.menuDescription}>{item.description}</Text>
          <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.menuImage} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={loading ? Array(4).fill({}) : restaurant.menuItems}
        renderItem={loading ? MenuItemSkeleton : renderItem}
        keyExtractor={(item, index) =>
          loading ? index.toString() : item.id.toString()
        }
        ListHeaderComponent={RestaurantHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingBottom: 20,
  },
  headerContainer: {
    height: 200,
    position: "relative",
    marginBottom: 20,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  headerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 15,
  },
  restaurantInfo: {
    gap: 5,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deliveryTime: {
    color: "#fff",
    fontSize: 14,
  },
  menuItemContainer: {
    marginHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  menuItem: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },
  menuInfo: {
    flex: 1,
    marginRight: 15,
    justifyContent: "space-between",
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  menuName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  menuDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B6B",
  },
  skeletonContainer: {
    backgroundColor: "#f0f0f0",
  },
  skeletonTitle: {
    height: 20,
    width: "70%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 12,
  },
  skeletonDescription: {
    height: 16,
    width: "90%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 12,
  },
  skeletonPrice: {
    height: 16,
    width: "30%",
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
  },
  skeletonImage: {
    backgroundColor: "#e0e0e0",
    width: 100,
    height: 100,
  },
});

export default RestaurantDetailsScreen;
