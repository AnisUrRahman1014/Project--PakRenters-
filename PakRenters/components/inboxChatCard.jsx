import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Color, FontFamily, sizeManager } from "../constants/GlobalStyles";
import { useFocusEffect, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { ipAddress } from "../constants/misc";
import User from "../app/classes/User";
import axios from "axios";

const ChatCard = ({ chat }) => {
  const navigation = useNavigation();
  const [chatId] = useState(chat._id);
  const [receiver, setReceiver] = useState(null);
  const [currentUserId, setCurrentUserId] = useState("");
  const [lastMessage, setLastMessage] = useState(null);
  const [messageBy, setMessageBy] = useState("");
  useFocusEffect(
    useCallback(() => {
      fetchOtherUser();
    }, [])
  );

  const fetchOtherUser = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const currentUserId = decodedToken.userId;
      const receiverId = currentUserId === chat.user1 ? chat.user2 : chat.user1;
      setCurrentUserId(currentUserId);
      const res = await axios.get(
        `http://${ipAddress}:8000/user/profile/${receiverId}`
      );
      const userData = res.data.user;
      const user = new User(
        userData.username,
        userData.email,
        userData.password,
        userData.phoneNumber
      );
      user.setProfilePic(userData.profilePic);
      console.log(user.profilePic);
      user.setProvince(userData.province);
      user.setCNIC(userData.cnic);
      user.setCity(userData.city);
      user.updateReputation(userData.reputation);
      user.postCount = userData.posts.length;
      user._id = receiverId;
      setReceiver(user);
      getLastMessage(chatId);
    } catch (error) {
      Alert.alert("Error", "Cannot fetch the user");
    }
  };

  const fetchLastMessage = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddress}:8000/messages/lastMessage/${chatId}`
      );
      if (response.data.success) {
        return response.data.message;
      } else {
        console.log("No messages found");
      }
    } catch (error) {
      console.log("Error fetching last message:", error);
    }
  };

  // Usage example
  const getLastMessage = async () => {
    const lastMessage = await fetchLastMessage(chatId);
    if (lastMessage) {
      setMessageBy(lastMessage.sender == currentUserId ? "you" : "they");
      setLastMessage(lastMessage.message);
    }
  };
  getLastMessage();
  if (!receiver) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size={sizeManager(5)} />
      </View>
    );
  }

  // DUMMY DATA
  let time = "07:30 pm";

  const handleOnPress = () => {
    navigation.navigate("screens/chatScreen", {
      receiver: receiver,
      senderId: currentUserId,
      chatId: chatId
    });
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
            source={{ uri: `http://${ipAddress}:8000/${receiver.profilePic}` }}
            style={styles.dpStyles}
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        {/* Username Container */}
        <View style={styles.username}>
          <Text style={styles.username.textStyles}>
            {receiver.username}
          </Text>
        </View>
        {/* Last Message Container*/}
        <View style={styles.lastMsg}>
          <Text style={styles.lastMsg.textStyles}>
            {`${messageBy}: ${lastMessage}`}
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
