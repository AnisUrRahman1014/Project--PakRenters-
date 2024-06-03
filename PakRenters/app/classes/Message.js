import axios from "axios";
import { Alert } from "react-native";
import { ipAddress } from "../../constants/misc";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Message {
  constructor(chatId, sender, message, messageType, time) {
    this.chatId = chatId;
    this.sender = sender;
    this.message = message;
    this.messageType = messageType;
    this.time = time;
  }

  uploadMessage = async () => {
    try {
      const response = await axios.post(
        `http:${ipAddress}:8000/messages/uploadNewMessage`,
        this
      );
      if (response.status === 200) {
        console.log("message sent");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      Alert.alert("Error sending message", "Something went wrong");
    }
  };

  uploadMediaMessage = async () => {
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      const formData = new FormData();
      formData.append("chatId", this.chatId);
      formData.append("sender", this.sender);
      formData.append("messageType", MessageTypes.MEDIA);
      formData.append("media", {
        uri: this.message,
        name: this.message.split("/").pop(),
        type: "image/jpeg"
      });
      const response = await axios.post(
        `http:${ipAddress}:8000/messages/uploadMediaMessage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      if (response.status === 200) {
        console.log("message sent");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error sending message", "Something went wrong");
    }
  };
}

export default Message;

export const MessageTypes = {
  TEXT: "text",
  MEDIA: "media"
};
