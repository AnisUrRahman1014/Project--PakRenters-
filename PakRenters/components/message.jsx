import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, sizeManager } from "../constants/GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const MessageComponent = ({ sender, message, time }) => {
  const messageWidth = message.toString().length;
  const [pov, setPOV] = useState("");
  useEffect(() => {
    checkPOV();
  });

  const checkPOV = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      if (decodedToken.userId === sender) {
        setPOV("you");
      } else {
        setPOV("them");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.mainContainer(pov)}>
      <View style={styles.bubbleContainer(messageWidth)}>
        <View style={styles.messageContainer(pov)}>
          <Text style={styles.message(pov)}>
            {message}
          </Text>
        </View>
        <View style={styles.timeContainer(pov)}>
          <Text style={styles.time(pov)}>
            {time}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MessageComponent;

const styles = StyleSheet.create({
  mainContainer: sender => ({
    width: "auto",
    height: "auto",
    alignItems: sender === "you" ? "flex-end" : "flex-start",
    marginBottom: sizeManager(0.5)
  }),
  bubbleContainer: messageWidth => ({
    flexDirection: "column",
    width: () => {
      messageWidth * 100;
    },
    maxWidth: "90%",
    minWidth: "25%"
  }),
  messageContainer: sender => ({
    paddingHorizontal: sizeManager(1.5),
    paddingTop: sizeManager(1),
    backgroundColor: sender === "you" ? Color.dark : Color.lightGrey,
    alignItems: sender === "you" ? "flex-end" : "flex-start",
    borderTopLeftRadius: sender === "you" ? sizeManager(2) : 0,
    borderTopRightRadius: sender === "them" ? sizeManager(2) : 0
  }),
  message: sender => ({
    fontFamily: FontFamily.ubuntuLight,
    fontSize: 18,
    color: sender === "you" ? Color.white : "black"
  }),
  timeContainer: sender => ({
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: sender === "you" ? Color.dark : Color.lightGrey,
    paddingHorizontal: sizeManager(1.5),
    paddingBottom: sizeManager(1),
    borderBottomLeftRadius: sender === "you" ? sizeManager(2) : 0,
    borderBottomRightRadius: sender === "them" ? sizeManager(2) : 0
  }),
  time: sender => ({
    fontFamily: FontFamily.ubuntuLight,
    fontSize: 12,
    color: sender === "you" ? Color.white : "black"
  })
});
