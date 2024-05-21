import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { Color } from "../../constants/GlobalStyles";
import ChatCard from "../../components/inboxChatCard";

const InboxScreen = () => {
  const chats = ["Hello", "Hello"];
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
  }
});

export default InboxScreen;
