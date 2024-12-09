import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { register } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "react-native-elements";
import UserContext from "../context/UserContext";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userInfo = { username: username, password: password, image: image };
  const [image, setImage] = useState(null);
  const [user, setUser] = useContext(UserContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register({ username, password, image }),
    onSuccess: (data) => {
      setUser(true);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSignUp = () => {
    mutate();
    // console.log("User Info:", { username, password, image });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => pickImage()}>
        <Image
          source={{ uri: image }}
          style={{
            height: 170,
            width: 170,
            borderRadius: 85,
            borderWidth: 0.5,
            borderColor: "#8c7851",
            marginTop: 30,
            marginBottom: 20,
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 50,
            top: 80,
            right: 48,
            zIndex: 9999,
          }}
        >
          <Icon name="photo-camera" size={80} color="gray" />
        </View>
      </TouchableOpacity>
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SignUp;
