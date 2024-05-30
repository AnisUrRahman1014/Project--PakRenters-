import { React, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Color, FontFamily, sizeManager } from "../constants/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { ipAddress } from "../constants/misc";
import axios from "axios";

const FavouritizedPostCard = ({ post, userId }) => {
  const { vehicle } = post;
  const [isFavorite, setIsFavorite] = useState(true);
  const handleFavoritize = async () => {
    const userData = { postId: post._id };
    try {
      const response = await axios.post(
        `http://${ipAddress}:8000/user/favorites/${userId}`,
        userData
      );
      if (response.status === 200) {
        setIsFavorite(!isFavorite);
        Alert.alert("Success", response.data.message);
      } else {
        Alert.alert("Failed", response.data.message);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
      Alert.alert("Error", "Failed to update favorite status");
    }
  };
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.leftContainer}>
        <Image
          source={{ uri: `http://${ipAddress}:8000/${vehicle.images[0]}` }}
          style={styles.image}
        />
      </View>

      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.cardLabel}>
            {post.title}
          </Text>
          <Text style={styles.locationLabel}>
            {post.location}
          </Text>
          <View style={styles.rateCommentContainer}>
            <Icon
              name="star"
              size={10}
              color={Color.focus}
              style={{ marginRight: wp(2) }}
            >
              <Text style={styles.rating}>
                {post.rating}
              </Text>
            </Icon>
            <Icon name="comment" size={10} color={Color.white}>
              <Text style={styles.rating}>
                {post.comments.length}
              </Text>
            </Icon>
          </View>

          <View style={styles.rentLabelContainer}>
            <Text style={styles.rentLabel}>
              {post.rent}/- Rs.
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleFavoritize}>
          <Icon
            name={isFavorite ? "heart" : "heart-o"}
            size={30}
            color={Color.dark}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: sizeManager(1),
    display: "flex",
    width: "100%",
    height: "auto",
    flexDirection: "row",
    backgroundColor: Color.white,
    alignItems: "center",
    gap: sizeManager(1),
    borderRadius: sizeManager(2),
    elevation: 5
  },
  leftContainer: {
    flex: 0.9,
    height: sizeManager(15),
    backgroundColor: Color.focus,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: sizeManager(2)
  },
  contentContainer: {
    flex: 1,
    height: sizeManager(15),
    justifyContent: "center",
    alignItems: "left"
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: sizeManager(2)
  },
  cardLabel: {
    fontFamily: FontFamily.ubuntuMedium,
    fontSize: sizeManager(2.2),
    color: Color.dark
  },
  locationLabel: {
    fontFamily: FontFamily.ubuntuLight,
    fontSize: 14,
    color: Color.dark
  },
  rating: {
    fontFamily: FontFamily.ubuntuLight,
    fontSize: 12,
    color: Color.dark
  },
  rateCommentContainer: {
    flexDirection: "row"
  },
  rentLabelContainer: {
    width: "50%",
    backgroundColor: Color.focus,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizeManager(0.5)
  },
  rentLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 16
  },
  btnContainer: {
    flex: 0.3
  }
});

export default FavouritizedPostCard;
