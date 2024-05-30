import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Linking,
  StyleSheet
} from "react-native";
import React, { useState, useEffect } from "react";
import { Color, sizeManager } from "../../constants/GlobalStyles";
import { Stack, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CustomFormInputField } from "../../components/misc";
import Message from "../../components/message";
import axios from "axios";
import { io } from "socket.io-client";
import { ipAddress } from "../../constants/misc";
import User from "../classes/User";

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
  //   Dummy Data
  const [messages, setMessages] = useState([
    { from: "you", message: "Hi", time: "07:21 pm" },
    { from: "them", message: "Hey, How are you doing?", time: "07:21 pm" },
    { from: "you", message: "Good, hbu?", time: "07:22 pm" },
    {
      from: "you",
      message: "When was the car tuned last time?",
      time: "07:25 pm"
    },
    {
      from: "you",
      message: "Hmny Naran tk jana hai, koi issue tu nhi hoga?",
      time: "07:27 pm"
    },
    {
      from: "them",
      message: "G me bhi thik. Last week hi tune krwayi hai",
      time: "07:30 pm"
    },
    {
      from: "them",
      message:
        "aap befikr ho k jayien, kehty hain tu me tasali bhi krwa donga ap check krlien",
      time: "07:33 pm"
    },
    { from: "you", message: "Ok, milty hain In sha allah", time: "07:40 pm" }
  ]);

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
    socket.emit("setup");
    socket.on("connected", () => {
      console.log("connected");
      getMessages();
    });
  }, []);

  const getMessages = () => {
    // axios
    //   .get(`http://localhost:3000/api/messages/${chatId}`, {
    //     headers: {
    //       "x-auth-token": localStorage.getItem("token"),
    //     },
    //   })
    //   .then((res) => {
    //     var tempMessages = [];
    //     res.data.map((msg) => {
    //       var message = msg;
    //       var createdAt = new Date(msg.createdAt);
    //       var time = createdAt.toLocaleTimeString([], {
    //         hour: "numeric",
    //         minute: "2-digit",
    //         hour12: true,
    //       });
    //       message.time = time;
    //       tempMessages.push(message);
    //     });
    //     setMessages(tempMessages);
    //   })
    //   .catch((err) => console.log(err));
    socket.emit("join chat", chatId);
  };

  useEffect(() => {
    socket.on("message recieved", msg => {
      setMessages([...messages, msg]);
    });
  });

  const handleOnSendBtn = () => {
    if (messageText.trim() !== "") {
      const newMessage = {
        chatId: chatId,
        message: messageText,
        sender: 1,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        })
      };
      socket.emit("new message", newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessageText("");
    }
  };
  // const handleSendMessage = () => {
  //   socket.emit("stop typing", chatId);

  //   if (messageInput.trim() !== "") {
  //     const message = {
  //       chatId: chatId,
  //       message: messageInput,
  //       sender: user._id,
  //     };
  //     axios
  //       .post("http://localhost:3000/api/messages", message, {
  //         headers: {
  //           "x-auth-token": localStorage.getItem("token"),
  //         },
  //       })
  //       .then((res) => {
  //         var msg = res.data;
  //         var createdAt = new Date(msg.createdAt);
  //         var time = createdAt.toLocaleTimeString([], {
  //           hour: "numeric",
  //           minute: "2-digit",
  //           hour12: true,
  //         });
  //         msg.time = time;
  //         socket.emit("new message", msg);
  //         setMessages([...messages, msg]);
  //         setMessageInput("");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

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
                openDialScreen(user.phoneNo);
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
          <Message
            key={index}
            sender={message.from}
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
