// AllRecommendationsScreen.js
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import restaurants from "../items/resturants";

const AllRecommendationsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {restaurants.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.recommendedItem}
          onPress={() =>
            navigation.navigate("RestaurantDetails", { restaurant: item })
          }
        >
          <View key={item.name} style={styles.recommendedItem}>
            <Image source={{ uri: item.image }} style={styles.foodImage} />
            <View style={styles.foodInfo}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodName}>{item.deliveryTime}</Text>
              <Text>{item.rating}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Corrected: Removed quotes
    backgroundColor: "#fff",
    padding: 20, // Corrected: Removed quotes
  },
  recommendedItem: {
    width: "100%", // Percentage can remain as a string
    backgroundColor: "#f8f8f8",
    borderRadius: 10, // Corrected: Removed quotes
    overflow: "hidden",
    marginBottom: 20, // Corrected: Removed quotes
  },
  foodImage: {
    width: "100%", // Percentage can remain as a string
    height: 120, // Corrected: Removed quotes
  },
  foodInfo: {
    paddingHorizontal: 10, // Corrected: Removed quotes
    paddingVertical: 5, // Corrected: Removed quotes
  },
  foodName: {
    fontSize: 16, // Corrected: Removed quotes
    fontWeight: "bold",
  },
});

export default AllRecommendationsScreen;
