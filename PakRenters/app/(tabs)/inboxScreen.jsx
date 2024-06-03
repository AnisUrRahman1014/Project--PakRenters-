import { View, StyleSheet, SafeAreaView, FlatList, Alert } from "react-native";
import React, { useCallback } from "react";
import { Color, sizeManager } from "../../constants/GlobalStyles";
import ChatCard from "../../components/inboxChatCard";
import HeaderSearchBar from "../../components/headerSearchBar";
import { validateUserExistance } from "../../constants/CPU";
import { useFocusEffect, useNavigation } from "expo-router";

const InboxScreen = () => {
  const navigation = useNavigation();
  const check = async () => {
    const userExists = await validateUserExistance();
    if (!userExists) {
      Alert.alert(
        "Login Required",
        "You must be logged-in in order to place a bundle request.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
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
  };
  useFocusEffect(
    useCallback(() => {
      check();
    }, [])
  );
  const chats = ["Hello", "Hello"];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <HeaderSearchBar />
      </View>
      <View style={styles.mainContainer}>
        {/* Chat cards */}
        <FlatList data={chats} renderItem={({ item }) => <ChatCard />} />
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
