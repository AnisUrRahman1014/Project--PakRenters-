import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { Alert } from "react-native";

export const validateUserExistance = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    Alert.alert("HELLO WORLD");
    return false;
  }
};
