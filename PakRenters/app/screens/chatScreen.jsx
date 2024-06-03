import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import { Color, sizeManager } from "../../constants/GlobalStyles";
import { Stack, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CustomFormInputField } from "../../components/misc";
import MessageComponent from "../../components/message";
import axios from "axios";
import { io } from "socket.io-client";
import { ipAddress } from "../../constants/misc";
import User from "../classes/User";
import Message, { MessageTypes } from "../classes/Message";

let socket;

const ChatScreen = () => {
  const { receiver, senderId, chatId } = useLocalSearchParams();
  const [sender, setSender] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://${ipAddress}:8000/user/profile/${senderId}`
        );
        const userData = res.data.user;
        const user = new User(
          userData.username,
          userData.email,
          "",
          userData.phoneNumber
        );
        user.setProfilePic(
          `http://${ipAddress}:8000/user/profilePic/${senderId}`
        );
        user.setProvince(userData.province);
        user.setCNIC(userData.cnic);
        user.setCity(userData.city);
        user.updateReputation(userData.reputation);
        user.postCount = userData.posts.length;
        user._id = senderId;
        setSender(user);
      } catch (error) {
        console.log("Error processing user profile", error);
      }
    };
    fetchUser();
  }, []);
  const [messages, setMessages] = useState([]);

  const openDialScreen = number => {
    const url = Platform.OS === "ios" ? `telprompt:${number}` : `tel:${number}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error("An error occurred", err));
  };

  useEffect(() => {
    socket = io(`http://${ipAddress}:8000`);
    socket.emit("setup", senderId);
    socket.on("connected", () => {
      console.log("connected");
      getMessages();
    });
  }, []);

  const getMessages = () => {
    axios
      .get(`http://${ipAddress}:8000/messages/getMessages/${chatId}`)
      .then(res => {
        let tempMessages = [];
        if (res.status === 200) {
          res.data.messages.map(msg => {
            let message = msg;
            let createdAt = new Date(msg.createdAt);
            let time = createdAt.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true
            });
            message.time = time;
            tempMessages.push(message);
          });
        }
        setMessages(tempMessages);
      })
      .catch(err => console.log(err));
    socket.emit("join chat", chatId);
  };

  useEffect(() => {
    socket.on("message recieved", msg => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });
  });

  const handleOnSendBtn = async () => {
    if (messageText.trim() !== "") {
      const msg = new Message(
        chatId,
        senderId,
        messageText,
        MessageTypes.TEXT,
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        })
      );
      msg.uploadMessage();
      socket.emit("new message", msg);
      setMessages(prevMessages => [...prevMessages, msg]);
      setMessageText("");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: receiver.username,
          headerTintColor: Color.white,
          headerStyle: { backgroundColor: Color.dark },
          headerTitleAlign: "center",
          headerRight: () =>
            <TouchableOpacity
              style={{
                position: "relative",
                right: -10,
                width: sizeManager(5),
                aspectRatio: 1,
                backgroundColor: Color.lightGrey,
                borderRadius: sizeManager(1),
                alignItems: "center",
                justifyContent: "center",
                elevation: 5
              }}
              onPress={() => {
                openDialScreen(receiver.phoneNo);
              }}
            >
              <MaterialIcons
                name="phone-enabled"
                size={25}
                color={Color.dark}
              />
            </TouchableOpacity>
        }}
      />
      {/* MESSAGES CONTAINER */}
      <ScrollView
        style={{
          height: sizeManager(2),
          marginBottom: sizeManager(0.5),
          backfaceVisibility: "visible"
        }}
        contentContainerStyle={{ paddingVertical: sizeManager(1) }}
      >
        {messages.map((message, index) =>
          <MessageComponent
            key={index}
            sender={message.sender}
            message={message.message}
            time={message.time}
          />
        )}
      </ScrollView>
      <View style={styles.inputContainer}>
        <View style={styles.inputContainer.iconPropsContainer}>
          {/* Emoji
          <TouchableOpacity>
            <Entypo name="emoji-happy" size={24} color={Color.dark} />
          </TouchableOpacity> */}
          {/* Media */}
          <TouchableOpacity>
            <MaterialIcons name="perm-media" size={24} color={Color.dark} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer.fieldContainer}>
          <CustomFormInputField
            placeHolder={"Type a message"}
            isIcon={false}
            value={messageText}
            onChange={setMessageText}
          />
        </View>
        <View style={styles.inputContainer.sendBtnContainer}>
          <TouchableOpacity onPress={handleOnSendBtn}>
            <MaterialIcons name="send" size={24} color={Color.focus} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  inputContainer: {
    flex: 0.07,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sizeManager(1),
    paddingVertical: sizeManager(1),
    backgroundColor: Color.white,
    gap: sizeManager(1),
    fieldContainer: {
      flex: 0.9
    },
    iconPropsContainer: {
      flex: 0.1,
      flexDirection: "row",
      gap: sizeManager(0.5),
      alignItems: "center",
      justifyContent: "center"
    },
    sendBtnContainer: {
      flex: 0.1,
      alignItems: "center",
      justifyContent: "center"
    }
  }
});

export default ChatScreen;
