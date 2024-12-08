// HomeScreen.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import restaurantCategories from "../items/restaurantCategories";
import restaurants from "../items/resturants";
import { Icon } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import ROUTE from "../navigation";

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const Item = ({ name, image }) => (
    <View key={name} style={styles.categoryItem}>
      <Image
        source={{ uri: image }}
        style={{ height: 80, width: 100, borderRadius: 10 }}
      />
      <Text>{name}</Text>
    </View>
  );
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <SafeAreaView>
        <Text style={styles.header}>Order Your Favorite Fast Food!</Text>
        <View style={styles.topContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search food, drink, desserts"
              style={styles.searchInput}
            />
            <Ionicons
              name="settings-outline"
              size={24}
              color="black"
              style={{ paddingLeft: 10 }}
            />
          </View>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate(ROUTE.HOME.BASKET)}
          >
            <Ionicons name="cart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 25, paddingBottom: 12 }}>Cuisines</Text>

        <FlatList
          data={restaurantCategories}
          renderItem={({ item }) => (
            <Item name={item.categoryName} image={item.categoryImage} />
          )}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
        >
          {restaurantCategories.map((item) => (
            <View key={item.categoryName} style={styles.categoryItem}>
              <Image
                source={{ uri: item.categoryImage }}
                style={{ height: 80, width: 100, borderRadius: 10 }}
              />
              <Text>{item.categoryName}</Text>
            </View>
          ))}
        </ScrollView> */}
        <View style={styles.recommendedHeader}>
          <Text style={styles.subHeader}>Recommended For You</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTE.HOME.ALLRECOMMENDATIONS)}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
        >
          <View style={styles.recommendedList}>
            {restaurants.slice(0, 2).map((item) => (
              <TouchableOpacity
                key={item.name}
                style={styles.recommendedItem}
                onPress={() =>
                  navigation.navigate(ROUTE.HOME.RESTURANTDETAILS, {
                    restaurant: item,
                  })
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
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  // searchContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 20,
  //   backgroundColor: "#f0f0f0",
  //   borderRadius: 10,
  //   paddingHorizontal: 10,
  // },
  // searchInput: {
  //   flex: 1,
  //   height: 40,
  // },
  banner: {
    backgroundColor: "#ffa500",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  bannerText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
  },
  orderButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  orderButtonText: {
    color: "#fff",
  },
  categories: {
    flexDirection: "row",
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 15,
    paddingBottom: 10,
  },
  recommendedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "900",
  },
  seeAll: {
    color: "#ffa500",
  },
  recommendedList: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 200,
    width: 375,
  },
  recommendedItem: {
    width: "48%",
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
    paddingVertical: "5px",
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  cartButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default HomeScreen;
