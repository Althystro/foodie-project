import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import basket from "../items/basket";

const Basket = ({ item }) => {
  const [basketItems, setBasketItems] = useState([]);

  const addItemToBasket = (item) => {
    setBasketItems(basketItems.add(item));
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.foodDescription}>{item.description}</Text>
      <Text style={styles.foodPrice}>${item.price.toFixed(2)}</Text>
      <Button title="Add to basket" onPress={() => addItemToBasket(item)} />
    </View>
  );

  return (
    <FlatList
      data={basketItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      // contentContainerStyle=
    />
  );
};

export default Basket;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  foodImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  foodDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
