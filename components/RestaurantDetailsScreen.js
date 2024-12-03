// // RestaurantDetailsScreen.js
// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Touchable,
//   TouchableOpacity,
// } from "react-native";

// const RestaurantDetailsScreen = ({ route, navigation }) => {
//   const { restaurant } = route.params;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {restaurant.menuItems.map((menuItem) => (
//         <TouchableOpacity
//           key={menuItem.id}
//           style={styles.recommendedItem}
//           onPress={() => navigation.navigate("FoodDetails", { food: menuItem })}
//         >
//           <View key={menuItem.id} style={styles.menuItem}>
//             <Image source={{ uri: menuItem.image }} style={styles.menuImage} />
//             <View style={styles.menuInfo}>
//               <Text style={styles.menuName}>{menuItem.name}</Text>
//               <Text>{menuItem.description}</Text>
//               <Text>${menuItem.price.toFixed(2)}</Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const RestaurantDetailsScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {restaurant.menuItems.map((menuItem) => (
        <TouchableOpacity
          key={menuItem.id}
          style={styles.recommendedItem}
          onPress={() => navigation.navigate("FoodDetails", { food: menuItem })}
        >
          <View style={styles.menuItem}>
            <Image source={{ uri: menuItem.image }} style={styles.menuImage} />
            <View style={styles.menuInfo}>
              <Text style={styles.menuName}>{menuItem.name}</Text>
              <Text>{menuItem.description}</Text>
              <Text>${menuItem.price.toFixed(2)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

/* <TouchableOpacity
key={item.name}
style={styles.recommendedItem}
onPress={() =>
  navigation.navigate("RestaurantDetails", { restaurant: item })
}
>
<Image source={{ uri: item.image }} style={styles.foodImage} />
<View style={styles.foodInfo}>
  <Text style={styles.foodName}>{item.name}</Text>
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
    }}
  >
    <Text style={{ fontSize: 15, fontWeight: "500" }}>
      {item.rating}
    </Text>
    <Image
      source={{
        uri: "https://static.vecteezy.com/system/resources/previews/022/133/469/non_2x/star-shape-star-icon-yellow-star-in-rating-symbol-free-png.png",
      }}
      style={{ height: 15, width: 15, borderRadius: 10 }}
    />{" "}
  </View>
  <Text style={{ fontSize: 15 }}>{item.deliveryTime}</Text>
</View>
</TouchableOpacity> */

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20, // Corrected to use numbers
    paddingVertical: 20,
  }, // Corrected to use numbers
  menuItem: {
    flexDirection: "row",
    marginBottom: 20,
  }, // Corrected to use numbers
  menuImage: {
    width: 80, // Corrected to use numbers
    height: 80, // Corrected to use numbers
    borderRadius: 10, // Corrected to use numbers
    marginRight: 15,
  }, // Corrected to use numbers
  menuInfo: {
    flexShrink: 1,
  }, // Corrected to use numbers
  menuName: {
    fontSize: 16, // Corrected to use numbers
    fontWeight: "bold",
  },
});

export default RestaurantDetailsScreen;
