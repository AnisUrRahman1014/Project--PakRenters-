import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily, sizeManager } from "../constants/GlobalStyles";
import ReputationBar from "./reputationBar";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";
import { ipAddress } from "../constants/misc";
import axios from "axios";
import { validateUserExistance } from "../constants/CPU";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
export default function RenterSummaryCard({
  user,
  showCallBtn = false,
  showMessageBtn = false,
  dualBtn = false
}) {
  const navigation = useNavigation();
  const [memberSinceYear, setMemberSinceYear] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          setCurrentUserId(userId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCurrentUser();
  }, []);
  useEffect(
    () => {
      if (user.memberSince) {
        const year = new Date(user.memberSince).getFullYear();
        setMemberSinceYear(year);
      }
    },
    [user.memberSince]
  );
  const handleViewProfileOnPress = () => {
    navigation.navigate("screens/userPovProfile", { user: user });
  };

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

  const checkOrCreateChat = async (senderId, receiverId) => {
    try {
      const response = await axios.post(
        `http://${ipAddress}:8000/chats/checkOrCreateChat`,
        {
          senderId,
          receiverId
        }
      );

      if (response.status === 200) {
        console.log(response.data.chatId);
        return response.data.chatId;
      } else {
        throw new Error("Failed to check or create chat");
      }
    } catch (error) {
      console.error("Error in checkOrCreateChat:", error);
      throw error;
    }
  };

  const handleOpenChat = async () => {
    const userExists = await validateUserExistance();
    if (!userExists) {
      Alert.alert(
        "Login Required",
        "You must be logged-in in order to chat",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Login / Sign Up",
            onPress: () => {
              navigation.navigate("(profile)", {
                screen: "profileDashboard"
              });
            }
          }
        ],
        { cancelable: false }
      );
      return;
    }
    try {
      const chatId = await checkOrCreateChat(currentUserId, user._id);
      navigation.navigate("screens/chatScreen", {
        receiver: user,
        senderId: currentUserId,
        chatId: chatId
      });
    } catch (error) {
      console.error("Error in handleOpenChat:", error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageSection}>
        <Image
          style={styles.imageContainer}
          source={{ uri: `http://${ipAddress}:8000/${user.profilePic}` }}
        />
      </View>
      <View style={[styles.contentSection(dualBtn), { marginLeft: wp(2) }]}>
        <View style={dualBtn ? styles.contentContainer : {}}>
          <Text style={styles.userName}>
            {user.username}
          </Text>
          <ReputationBar reputation={user.reputation} />
          <Text style={styles.secondaryLabel}>
            Member since {memberSinceYear}
          </Text>
          <TouchableOpacity onPress={handleViewProfileOnPress}>
            <Text
              style={[
                styles.secondaryLabel,
                {
                  textDecorationLine: "underline",
                  textDecorationColor: Color.grey
                }
              ]}
            >
              View Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showMessageBtn &&
        <View style={styles.btnSection(dualBtn)}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={handleOpenChat}
          >
            <MaterialIcon name="message" size={30} color={Color.dark} />
          </TouchableOpacity>
        </View>}
      {showCallBtn &&
        <View style={styles.btnSection(dualBtn)}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => openDialScreen(user.phoneNo)}
          >
            <MaterialIcon name="call" size={30} color={Color.dark} />
          </TouchableOpacity>
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: "relative",
    width: "100%",
    height: sizeManager(12),
    flexDirection: "row",
    paddingVertical: wp(2),
    alignItems: "center"
  },
  contentSection: dualBtn => ({
    flex: 1,
    justifyContent: "center",
    alignItems: dualBtn ? "center" : "flex-start"
  }),
  contentContainer: {
    alignItems: "flex-start",
    padding: sizeManager(0.01)
  },
  imageSection: {
    flex: 0.3
  },
  btnSection: dualBtn => ({
    flex: dualBtn ? 0.3 : 0.6,
    height: "100%"
  }),
  btnContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: sizeManager(0.01)
  },
  imageContainer: {
    width: wp(20),
    height: wp(20),
    resizeMode: "cover",
    backgroundColor: Color.dark
  },
  userName: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: wp(5),
    color: Color.grey
  },
  secondaryLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: wp(4),
    color: Color.grey
  }
});
