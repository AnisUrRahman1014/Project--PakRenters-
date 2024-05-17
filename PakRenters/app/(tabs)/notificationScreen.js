import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";
import { Color, sizeManager } from "../../constants/GlobalStyles";
import Notification from "../../components/notification";

const notificationScreen = () => {
  // const [notifications, setNotifications] = useState([]);
  const notifications = [
    { type: "Alert", content: "Hello World" },
    { type: "Alert", content: "Superman di aesi di tesi" },
    { type: "Alert", content: "Super di aesi di tesi ek vari fer" },
    { type: "Alert", content: "Hello World" },
    { type: "Alert", content: "Superman di aesi di tesi" },
    { type: "Alert", content: "Super di aesi di tesi ek vari fer" },
    { type: "Alert", content: "Hello World" },
    { type: "Alert", content: "Superman di aesi di tesi" },
    { type: "Alert", content: "Super di aesi di tesi ek vari fer" },
    { type: "Alert", content: "Hello World" },
    { type: "Alert", content: "Superman di aesi di tesi" },
    { type: "Alert", content: "Super di aesi di tesi ek vari fer" },
    { type: "Alert", content: "Hello World" },
    { type: "Alert", content: "Superman di aesi di tesi" },
    { type: "Alert", content: "Super di aesi di tesi ek vari fer" },
    { type: "Alert", content: "Hello World" },
    { type: "Alert", content: "Superman di aesi di tesi" },
    { type: "Alert", content: "Super di aesi di tesi ek vari fer" },
    { type: "Alert", content: "Hello World" },
    { type: "Alert", content: "Superman di aesi di tesi" },
    { type: "Alert", content: "Super di aesi di tesi ek vari fer" },
    { type: "Alert", content: "Hello World" },
    { type: "Alert", content: "Superman di aesi di tesi" },
    { type: "Alert", content: "Super di aesi di tesi ek vari fer" }
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <FlatList
          data={notifications}
          renderItem={({ item }) =>
            <Notification type={item.type} content={item.content} />}
          contentContainerStyle={{
            gap: 1
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    paddingVertical: sizeManager(1)
  }
});

export default notificationScreen;
