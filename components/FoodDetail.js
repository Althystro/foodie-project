import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBasket } from "../context/BasketContext";

const FoodDetail = ({ route, navigation }) => {
  const { food } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { addToBasket } = useBasket();

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalPrice = (food.price * quantity).toFixed(2);

  const handleAddToBasket = () => {
    addToBasket(food, quantity);
    Alert.alert(
      "Added to Basket",
      `${quantity} x ${food.name} added to your basket`,
      [
        {
          text: "Continue Shopping",
          style: "cancel",
        },
        {
          text: "View Basket",
          onPress: () => navigation.navigate("Basket"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ height: "100%", width: "100%" }}>
        <Image source={{ uri: food.image }} style={styles.foodImage} />
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.foodName}>{food.name}</Text>
            <Text style={styles.foodDescription}>{food.description}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Total Price:</Text>
              <Text style={styles.priceValue}>{totalPrice} KD</Text>
            </View>
          </View>
          <View>
            <View style={styles.increment}>
              <TouchableOpacity
                onPress={decreaseQuantity}
                style={styles.buttons}
              >
                <Icon name="remove-circle-outline" size={30} color="#FF6B6B" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={increaseQuantity}
                style={styles.buttons}
              >
                <Icon name="add-circle-outline" size={30} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
            <Button
              buttonStyle={styles.button}
              title={`Add to Basket - ${totalPrice} KD`}
              onPress={handleAddToBasket}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  foodImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -25,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  foodName: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  foodDescription: {
    fontSize: 16,
    color: "#666",
    marginVertical: 15,
    lineHeight: 24,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  priceLabel: {
    fontSize: 18,
    color: "#666",
    fontWeight: "500",
  },
  priceValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FF6B6B",
  },
  increment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  buttons: {
    marginHorizontal: 15,
    padding: 5,
  },
  quantityText: {
    fontSize: 24,
    fontWeight: "600",
    marginHorizontal: 20,
    color: "#333",
    minWidth: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF6B6B",
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 10,
  },
});

export default FoodDetail;
