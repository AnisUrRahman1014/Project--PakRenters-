import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { Color, sizeManager } from "../../constants/GlobalStyles";
import ChatCard from "../../components/inboxChatCard";
import HeaderSearchBar from "../../components/headerSearchBar";

const InboxScreen = () => {
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
