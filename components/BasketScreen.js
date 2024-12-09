import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Icon } from "react-native-elements";
import { useBasket } from "../context/BasketContext";

const BasketScreen = () => {
  const {
    basketItems,
    removeFromBasket,
    updateQuantity,
    getBasketTotal,
    getItemCount,
  } = useBasket();

  const renderItem = ({ item }) => (
    <View style={styles.basketItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            style={styles.quantityButton}
          >
            <Icon name="remove-circle-outline" size={24} color="#FF6B6B" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            style={styles.quantityButton}
          >
            <Icon name="add-circle-outline" size={24} color="#FF6B6B" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => removeFromBasket(item.id)}
            style={styles.removeButton}
          >
            <Icon
              name="trash-outline"
              type="ionicon"
              size={20}
              color="#FF6B6B"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (basketItems.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Icon name="basket-outline" type="ionicon" size={80} color="#ccc" />
        <Text style={styles.emptyText}>Your basket is empty</Text>
        <Text style={styles.emptySubtext}>
          Add some delicious items to get started!
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={basketItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.totalContainer}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalItems}>{getItemCount()} items</Text>
          <Text style={styles.totalAmount}>
            Total: ${getBasketTotal().toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    padding: 15,
  },
  basketItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
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
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF6B6B",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    padding: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: "center",
  },
  removeButton: {
    marginLeft: "auto",
    padding: 5,
  },
  totalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  totalInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  totalItems: {
    fontSize: 16,
    color: "#666",
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  checkoutButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
  },
});

export default BasketScreen;
