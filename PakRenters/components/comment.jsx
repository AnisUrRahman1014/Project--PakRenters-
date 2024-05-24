import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Color, FontFamily, sizeManager } from "../constants/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";

const CommentComponent = ({ comment }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.innerContainer}>
          <Image
            source={require("../assets/images/Anis.jpg")}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.usernameContainer}>
          <Text style={styles.usernameContainer.label}>i_a_n_33_s</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Icon name={"star"} size={15} color={Color.focus} />
          <Text style={styles.ratingContainer.label}>
            {comment.rating}
          </Text>
        </View>
        <View style={styles.commentContentContainer}>
          <Text style={styles.commentContentContainer.label}>
            {comment.comment}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CommentComponent;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Color.white,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: sizeManager(1),
    borderColor: Color.dark,
    borderBottomWidth: sizeManager(0.1),
    marginBottom: sizeManager(0.5)
  },
  leftContainer: {
    flex: 0.3,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  innerContainer: {
    borderRadius: sizeManager(100),
    width: "95%",
    aspectRatio: 1,
    backgroundColor: Color.lightGrey,
    justifyContent: "center",
    alignItems: "center"
  },
  rightContainer: {
    flex: 1,
    paddingLeft: 10,
    alignItems: "flex-start"
  },
  usernameContainer: {
    label: {
      fontFamily: FontFamily.ubuntuBold,
      fontSize: 14,
      color: Color.dark
    },
    width: "100%",
    paddingHorizontal: sizeManager(1),
    paddingVertical: sizeManager(0.2),
    justifyContent: "center",
    alignItems: "flex-start"
  },
  ratingContainer: {
    label: {
      fontFamily: FontFamily.ubuntuRegular,
      fontSize: 14,
      color: Color.grey
    },
    width: "100%",
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: sizeManager(1),
    paddingVertical: sizeManager(0.2),
    justifyContent: "flex-start",
    alignItems: "center"
  },
  commentContentContainer: {
    label: {
      fontSize: 16,
      color: Color.grey
    },
    width: "100%",
    paddingHorizontal: sizeManager(1),
    paddingVertical: sizeManager(0.2)
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: sizeManager(100)
  }
});
