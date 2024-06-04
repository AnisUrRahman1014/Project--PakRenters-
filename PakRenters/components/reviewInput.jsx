import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { CustomFormInputField } from "./misc";
import { Color, FontFamily, sizeManager } from "../constants/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { validateUserExistance } from "../constants/CPU";
import Comment from "../app/classes/Comment";

const ReviewInput = ({ postId, onSubmitComment }) => {
  const [userId, setUserId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [charCount, setCharCount] = useState(0);

  const fetchUserId = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
        return decodedToken.userId;
      } else {
        throw new Error("No token found");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleStarPress = starIndex => {
    setRating(starIndex);
  };

  const handleCommentChange = text => {
    if (text.length <= 200) {
      setComment(text);
      setCharCount(text.length);
    } else {
      Alert.alert(
        "Word Limit Reached",
        "Cannot accept more than 200 characters"
      );
    }
  };

  const handleOnSubmit = async () => {
    const userExists = await validateUserExistance();
    if (!userExists) {
      Alert.alert(
        "Login Required",
        "You must be logged-in in order to book a vehicle.",
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
      const userId = await fetchUserId();
      if (!userId) {
        Alert.alert("Error", "Unable to fetch user ID");
        return;
      }

      if (rating === 0) {
        Alert.alert("Incomplete review", "Please provide a rating as well");
        return;
      }

      const newComment = new Comment(postId, userId, comment, rating);
      newComment.submit();
      onSubmitComment(newComment);
    } catch (error) {
      console.error("Error fetching user ID:", error);
      Alert.alert("Error", "An error occurred while fetching user ID");
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.starContainer}>
        <View style={styles.starContainer.left}>
          <Text style={styles.rateLabel}>Rate: </Text>
        </View>
        <View style={styles.starContainer.right}>
          {[1, 2, 3, 4, 5].map(star =>
            <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
              <Icon
                name={star <= rating ? "star" : "star-o"}
                size={30}
                color={star <= rating ? Color.focus : Color.lightGrey}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <CustomFormInputField
        placeHolder={"Enter your comment"}
        isIcon={false}
        multiline={true}
        textAlignVertical="top"
        value={comment}
        onChange={handleCommentChange}
      />
      <View style={styles.btnContainer}>
        <Text>{`${charCount}/200`}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleOnSubmit}>
          <Text style={styles.submitBtnLabel}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReviewInput;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "auto",
    padding: sizeManager(1),
    borderWidth: sizeManager(0.1),
    borderColor: Color.grey,
    borderRadius: sizeManager(2)
  },
  starContainer: {
    flexDirection: "row",
    marginVertical: sizeManager(0.3),
    left: {
      flex: 0.2,
      alignItems: "center",
      justifyContent: "center"
    },
    right: {
      flex: 0.8,
      flexDirection: "row",
      gap: 10
    }
  },
  rateLabel: {
    fontFamily: FontFamily.ubuntuMedium,
    fontSize: 16,
    color: Color.grey
  },
  btnContainer: {
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
    marginVertical: sizeManager(0.3)
  },
  submitBtn: {
    paddingHorizontal: sizeManager(1),
    paddingVertical: sizeManager(0.5),
    backgroundColor: Color.dark,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizeManager(0.5)
  },
  submitBtnLabel: {
    color: Color.white
  }
});
