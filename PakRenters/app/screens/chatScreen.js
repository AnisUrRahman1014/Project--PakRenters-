import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Color, sizeManager } from "../../constants/GlobalStyles";
import { Stack, useLocalSearchParams } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CustomFormInputField } from "../../components/misc";
import Message from "../../components/message";

const ChatScreen = () => {
  const { username } = useLocalSearchParams();
  const [messageText, setMessageText] = useState("");
  const scrollViewRef = useRef();
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

  const handleOnSendBtn = () => {
    if (messageText.trim() !== "") {
      const newMessage = {
        from: "you",
        message: messageText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        })
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessageText("");

      //   scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: username,
          headerTintColor: Color.dark,
          headerTitleAlign: "center"
        }}
      />
      {/* MESSAGES CONTAINER */}
      <ScrollView
        style={{ height: sizeManager(2), marginBottom: sizeManager(0.5) }}
        contentContainerStyle={{ paddingVertical: sizeManager(1) }}
        ref={scrollViewRef}
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
            <MaterialIcons name="send" size={24} color={Color.dark} />
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
