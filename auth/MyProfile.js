import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../api/auth";
import { Ionicons } from "@expo/vector-icons";
import { deleteToken } from "../api/storage";
import ROUTE from "../navigation";
import UserContext from "../context/UserContext";

const MyProfile = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0.3);
  const [imageError, setImageError] = useState(false);
  const [user, setUser] = useContext(UserContext);

  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getMyProfile,
  });
  console.log(userInfo?.image);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const ProfileSkeleton = () => (
    <View style={styles.profileCard}>
      <Animated.View style={[styles.skeletonImage, { opacity: fadeAnim }]} />
      <View style={styles.infoContainer}>
        <Animated.View
          style={[styles.skeletonUsername, { opacity: fadeAnim }]}
        />
        <Animated.View style={[styles.skeletonId, { opacity: fadeAnim }]} />
      </View>
    </View>
  );

  const ProfileImage = () => (
    <View style={styles.imageContainer}>
      {imageError ? (
        <View style={[styles.profileImage, styles.placeholderContainer]}>
          <Ionicons name="person" size={60} color="#ccc" />
        </View>
      ) : (
        <Image
          source={{
            uri: `https://react-native-food-delivery-be.eapi.joincoded.com/${userInfo?.image}`,
          }}
          style={styles.profileImage}
          onError={() => setImageError(true)}
        />
      )}
      <View style={styles.onlineBadge} />
    </View>
  );
  const logout = () => {
    deleteToken();
    setUser(false);
  };
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: logout,
        style: "destructive",
      },
    ]);
  };

  const ActionButton = ({ icon, label, onPress, danger }) => (
    <TouchableOpacity
      style={[styles.actionButton, danger && styles.dangerButton]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={24}
        color={danger ? "#FF3B30" : "#FF6B6B"}
        style={styles.actionIcon}
      />
      <View style={styles.actionTextContainer}>
        <Text style={[styles.actionText, danger && styles.dangerText]}>
          {label}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={danger ? "#FF3B30" : "#999"}
        />
      </View>
    </TouchableOpacity>
  );

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={48} color="#FF6B6B" />
          <Text style={styles.errorText}>Error loading profile</Text>
          <Text style={styles.errorMessage}>{error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Profile</Text>
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <View style={styles.profileCard}>
            <ProfileImage />
            <View style={styles.infoContainer}>
              <Text style={styles.username}>{userInfo?.username}</Text>
              <View style={styles.idContainer}>
                <Text style={styles.idLabel}>ID:</Text>
                <Text style={styles.userId}>{userInfo?._id}</Text>
              </View>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>28</Text>
                <Text style={styles.statLabel}>Orders</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Reviews</Text>
              </View>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <ActionButton
              icon="receipt-outline"
              label="Past Orders"
              onPress={() => navigation.navigate(ROUTE.PROFILE.PASTORDERS)}
            />
            <ActionButton
              icon="star-outline"
              label="My Reviews"
              onPress={() => {}}
            />
            <ActionButton
              icon="settings-outline"
              label="Settings"
              onPress={() => {}}
            />
            <View style={styles.logoutDivider} />
            <ActionButton
              icon="log-out-outline"
              label="Logout"
              onPress={handleLogout}
              danger
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: 20,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
    marginTop: 20,
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    position: "relative",
    alignSelf: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
  },
  placeholderContainer: {
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
  },
  onlineBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    borderWidth: 3,
    borderColor: "#fff",
  },
  infoContainer: {
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  idContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  idLabel: {
    fontSize: 14,
    color: "#666",
    marginRight: 4,
  },
  userId: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: 24,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#f0f0f0",
  },
  actionsContainer: {
    marginTop: 24,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  actionIcon: {
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
  },
  errorMessage: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  // Skeleton styles
  skeletonImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e0e0e0",
    alignSelf: "center",
    marginBottom: 20,
  },
  skeletonUsername: {
    width: 150,
    height: 24,
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
    marginBottom: 12,
  },
  skeletonId: {
    width: 100,
    height: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  logoutDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 8,
    marginHorizontal: 16,
  },
  dangerButton: {
    backgroundColor: "#FFF5F5",
  },
  dangerText: {
    color: "#FF3B30",
  },
});
