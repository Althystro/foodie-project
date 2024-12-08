import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ROUTE from "../navigation";

const RestaurantDetailsScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recommendedItem}
      onPress={() =>
        navigation.navigate(ROUTE.HOME.FOODDETAILS, { food: item })
      }
    >
      <View style={styles.menuItem}>
        <Image source={{ uri: item.image }} style={styles.menuImage} />
        <View style={styles.menuInfo}>
          <Text style={styles.menuName}>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={restaurant.menuItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()} // Ensure keys are strings
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  menuInfo: {
    flexShrink: 1,
  },
  menuName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RestaurantDetailsScreen;
