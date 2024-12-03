import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

const FoodDetail = ({ route }) => {
  const { food } = route.params; // Destructure food from route params

  return (
    <View style={styles.container}>
      <Image source={{ uri: food.image }} style={styles.foodImage} />
      <Text style={styles.foodName}>{food.name}</Text>
      <Text style={styles.foodDescription}>{food.description}</Text>
      <Text style={styles.foodPrice}>${food.price.toFixed(2)}</Text>
      <View>
        <Button buttonStyle={styles.button} title={"Add to basket"}></Button>
      </View>
    </View>
  );
};

export default FoodDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  foodImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  foodName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  foodDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  foodPrice: {
    fontSize: 18,
    color: "green",
  },
  button: {
    backgroundColor: "orange",
    width: 150,
    height: 60,
    color: "red",
  },
});
