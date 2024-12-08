import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const FoodDetail = ({ route }) => {
  const { food } = route.params; // Destructure food from route params

  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ height: "100%", width: "100%" }}>
        <Image source={{ uri: food.image }} style={styles.foodImage} />
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.foodName}>{food.name}</Text>
            {/* <View style={styles.infoRow}>
          <Text style={styles.infoText}>Ratings</Text>
          <Text style={styles.infoText}>Time</Text>
          <Text style={styles.infoText}>Calories</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoValue}>⭐ 4.8</Text>
          <Text style={styles.infoValue}>⏱ 12 min</Text>
          <Text style={styles.infoValue}>🔥 145 kcal</Text>
        </View> */}
            <Text style={styles.foodDescription}>{food.description}</Text>

            <Text style={{ fontSize: 30, fontWeight: "500" }}>
              {food.price} KD
            </Text>
          </View>
          <View style={styles.increment}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.buttons}>
              <Icon name="remove-circle-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.buttons}>
              <Icon name="add-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Button buttonStyle={styles.button} title="Add to Basket" />
        </View>
      </View>
    </View>
  );
};

export default FoodDetail;

const styles = StyleSheet.create({
  increment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttons: {
    marginHorizontal: 5,
    color: "black",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    // backgroundColor: "red",
    height: "100%",
    width: "100%",
  },
  foodImage: {
    width: "100%",
    height: 500,
    // borderRadius: 10,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },
  foodName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#888",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  foodDescription: {
    fontSize: 16,
    color: "#666",
    marginVertical: 10,
  },
  extraContainer: {
    marginVertical: 10,
  },
  extraTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  extraItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  notesContainer: {
    marginVertical: 10,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginTop: 5,
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 20,
  },
});
