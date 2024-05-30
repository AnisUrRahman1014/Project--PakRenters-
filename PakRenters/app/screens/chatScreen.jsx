import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Linking,
  StyleSheet
} from "react-native";
import React, { useState } from "react";
import { Color, sizeManager } from "../../constants/GlobalStyles";
import { Stack, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CustomFormInputField } from "../../components/misc";
import Message from "../../components/message";

const ChatScreen = () => {
  const { user } = useLocalSearchParams();
  const [messageText, setMessageText] = useState("");
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
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: user.username,
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
