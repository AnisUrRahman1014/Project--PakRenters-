import axios from "axios";
import { Alert } from "react-native";
import { ipAddress } from "../../constants/misc";

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
}

export default Message;

export const MessageTypes = {
  TEXT: "text",
  MEDIA: "media"
};
