import { View, StyleSheet, SafeAreaView, FlatList, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { Color, sizeManager } from "../../constants/GlobalStyles";
import ChatCard from "../../components/inboxChatCard";
import HeaderSearchBar from "../../components/headerSearchBar";
import { validateUserExistance } from "../../constants/CPU";
import { useFocusEffect, useNavigation } from "expo-router";
import axios from "axios";
import { ipAddress } from "../../constants/misc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
const InboxScreen = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [searchFor, setSearchFor] = useState("");

  useFocusEffect(
    useCallback(
      () => {
        fetchChats();
      },
      [searchFor]
    )
  );

  const fetchChats = async () => {
    const userExists = await validateUserExistance();
    if (!userExists) {
      setChats([]);
      Alert.alert(
        "Login Required",
        "You must be logged-in in order to place a bundle request.",
        [
          {
            text: "Cancel",
            onPress: () => {
              navigation.navigate("index");
            },
            style: "cancel"
          },
          {
            text: "Login / Sign Up",
            onPress: () => {
              navigation.navigate("(profile)", {
                screen: "profileDashboard"
              });
            }
          }
        ],
        { cancelable: false }
      );
      return;
    }
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const response = await axios.get(
          `http://${ipAddress}:8000/chats/getChats/${userId}`
        );
        if (response.status === 200) {
          setChats(response.data.chats);
          console.log(chats);
        } else {
          console.log("Error");
        }
      } else {
        console.log("no token");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilteredChats = async query => {
    const userExists = await validateUserExistance();
    if (!userExists) {
      setChats([]);
      Alert.alert(
        "Login Required",
        "You must be logged-in in order to place a bundle request.",
        [
          {
            text: "Cancel",
            onPress: () => {
              navigation.navigate("index");
            },
            style: "cancel"
          },
          {
            text: "Login / Sign Up",
            onPress: () => {
              navigation.navigate("(profile)", {
                screen: "profileDashboard"
              });
            }
          }
        ],
        { cancelable: false }
      );
      return;
    }
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const response = await axios.post(
          `http://${ipAddress}:8000/chats/getFilteredChats/${userId}`,
          { filter: query }
        );
        if (response.status === 200) {
          setChats(response.data.chats);
          console.log(chats);
        } else {
          console.log("Error");
        }
      } else {
        console.log("no token");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchOnChange = text => {
    setSearchFor(text);
    fetchFilteredChats(text); // Fetch chats based on the search query
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <HeaderSearchBar
          value={searchFor}
          handleSearchOnChange={handleSearchOnChange}
        />
      </View>
      <View style={styles.mainContainer}>
        {/* Chat cards */}
        <FlatList
          data={chats}
          renderItem={({ item }) => <ChatCard chat={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white
  },
  header: {
    backgroundColor: Color.dark,
    height: sizeManager(10),
    justifyContent: "center",
    alignItems: "center"
  }
});

export default InboxScreen;
