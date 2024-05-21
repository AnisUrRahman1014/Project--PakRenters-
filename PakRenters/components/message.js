import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, sizeManager } from "../constants/GlobalStyles";

const Message = ({ sender, message, time }) => {
  //   const [messageWidth, setMessageWidth] = useState(0);
  console.log(message.toString().length);
  const messageWidth = message.toString().length;

  return (
    <View style={styles.mainContainer(sender)}>
      <View style={styles.bubbleContainer(messageWidth)}>
        <View
          style={styles.messageContainer(sender)}
          //   onLayout={event => setMessageWidth(event.nativeEvent.layout.width)}
        >
          <Text style={styles.message(sender)}>
            {message}
          </Text>
        </View>
        <View style={styles.timeContainer(sender)}>
          <Text style={styles.time(sender)}>
            {time}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Message;

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
