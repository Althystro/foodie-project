import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../api/auth";
import { BASE_URL } from "../api";

const MyProfile = () => {
  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getMyProfile,
  });

  console.log(userInfo);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading profile: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={{
            uri: `${BASE_URL}/${userInfo?.image}`,
          }}
          style={styles.profileImage}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.username}>{userInfo?.username}</Text>
          <Text style={styles.userId}>ID: {userInfo?.id}</Text>
        </View>
      </View>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userId: {
    fontSize: 14,
    color: "#666",
  },
});
