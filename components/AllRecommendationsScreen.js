import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import restaurants from "../items/resturants";
import ROUTE from "../navigation";

const AllRecommendationsScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recommendedItem}
      onPress={() =>
        navigation.navigate(ROUTE.HOME.RESTURANTDETAILS, { restaurant: item })
      }
    >
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodName}>{item.deliveryTime}</Text>
        <Text>{item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={restaurants}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  recommendedItem: {
    width: "100%",
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  foodImage: {
    width: "100%",
    height: 120,
  },
  foodInfo: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AllRecommendationsScreen;
