import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Color, FontFamily, sizeManager } from "../constants/GlobalStyles";
import { useNavigation } from "expo-router";

const ChatCard = () => {
  const navigation = useNavigation();
  // DUMMY DATA
  let username = "i_a_n_33_s";
  let lastMsg = "you: Thank you for the car, Loved it!";
  let time = "07:30 pm";

  const handleOnPress = () => {
    navigation.navigate("screens/chatScreen", { username: username });
  };
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => {
        handleOnPress();
      }}
    >
      <View style={styles.dpContainer}>
        <View style={styles.dpContainer.innerContainer}>
          <Image
            source={require("../assets/images/Anis.jpg")}
            style={styles.dpStyles}
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        {/* Username Container */}
        <View style={styles.username}>
          <Text style={styles.username.textStyles}>
            {username}
          </Text>
        </View>
        {/* Last Message Container*/}
        <View style={styles.lastMsg}>
          <Text style={styles.lastMsg.textStyles}>
            {lastMsg}
          </Text>
        </View>
        {/* Time Container*/}
        <View style={styles.time}>
          <Text style={styles.time.textStyles}>
            {time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: sizeManager(10),
    flexDirection: "row",
    borderBottomWidth: sizeManager(0.15),
    borderColor: Color.dark
  },
  dpContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    innerContainer: {
      width: "80%",
      aspectRatio: 1,
      borderRadius: sizeManager(100)
    }
  },
  dpStyles: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: sizeManager(100)
  },
  contentContainer: {
    flex: 1,
    padding: sizeManager(1)
  },
  username: {
    paddingVertical: sizeManager(0.2),
    textStyles: {
      fontFamily: FontFamily.ubuntuRegular,
      fontSize: 18,
      color: Color.dark
    }
  },
  lastMsg: {
    paddingVertical: sizeManager(0.5),
    textStyles: {
      fontFamily: FontFamily.ubuntuLight,
      fontSize: 14,
      color: Color.grey
    }
  },
  time: {
    paddingVertical: sizeManager(0.2),
    alignItems: "space-between",
    textStyles: {
      fontFamily: FontFamily.ubuntuLight,
      fontSize: 12,
      color: Color.grey
    }
  }
});

export default ChatCard;
