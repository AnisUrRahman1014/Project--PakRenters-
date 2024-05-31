import { React, useCallback, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Color, FontFamily, sizeManager } from "../constants/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect, useNavigation } from "expo-router";
import { ipAddress } from "../constants/misc";
import Vehicle from "../app/classes/Vehicle0";
import Post from "../app/classes/Post0";
import User from "../app/classes/User";
import axios from "axios";

const VehicleCard = ({ postId, onPress = null }) => {
  const [post, setPost] = useState(null);
  const navigation = useNavigation();
  const [vehicle, setVehicle] = useState(null);

  useFocusEffect(
    useCallback(() => {
      fetchPost();
    }, [])
  );

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddress}:8000/post/getPostById/${postId}`
      );
      const { vehicleId, user, ...post } = response.data.data;
      const newVehicle = prepareVehicleObject(vehicleId);
      const newUser = prepareUserObject(user);
      const newPost = preparePostObject(post, newUser);
      newPost.setVehicle(newVehicle);
      setPost(newPost);
      setVehicle(newVehicle);
      setIsSnoozed(newPost.status);
    } catch (error) {
      console.log(error);
    }
  };

  const prepareUserObject = fetchedUser => {
    const user = new User(
      fetchedUser.username,
      fetchedUser.email,
      "",
      fetchedUser.phoneNumber
    );
    user.setCity(fetchedUser.city);
    user.setCNIC(fetchedUser.cnic);
    user.setProvince(fetchedUser.province);
    user.setProfilePic(fetchedUser.profilePic);
    user.reputation = fetchedUser.reputation;
    user.memberSince = fetchedUser.memberSince;
    user._id = fetchedUser._id;
    user.posts = fetchedUser.posts;
    return user;
  };

  const preparePostObject = (fetchedPost, user) => {
    const location = JSON.parse(fetchedPost.location);
    const locationStr =
      location.region.concat(", ") +
      location.city.concat(", ") +
      location.street;
    const newPost = new Post(
      user,
      fetchedPost.postId,
      fetchedPost.title,
      fetchedPost.description,
      fetchedPost.category,
      locationStr,
      fetchedPost.rentPerDay
    );
    newPost.setFeatured(true);
    newPost.setServices(fetchedPost.services);
    newPost.comments = fetchedPost.comments;
    newPost.rating = fetchedPost.rating;
    newPost._id = fetchedPost._id;
    newPost.status = fetchedPost.status;
    return newPost;
  };

  const prepareVehicleObject = fetchedVehicle => {
    const newVehicle = new Vehicle(
      fetchedVehicle.postId,
      fetchedVehicle.make,
      fetchedVehicle.model,
      fetchedVehicle.year,
      fetchedVehicle.engine,
      fetchedVehicle.seatingCapacity,
      fetchedVehicle.transmission,
      fetchedVehicle.ac,
      fetchedVehicle.abs,
      fetchedVehicle.cruise
    );
    newVehicle.setImages(fetchedVehicle.images);
    return newVehicle;
  };

  const handleOnPress = () => {
    navigation.navigate("screens/bookingsScreen_RENTER", { post: post });
  };

  const truncate = (title, maxSize) => {
    return title.length > maxSize ? `${title.substring(0, maxSize)}...` : title;
  };

  if (onPress === null) {
    onPress = handleOnPress;
  }
  if (!post || !vehicle) {
    return (
      <View>
        <ActivityIndicator size={sizeManager(5)} color={Color.focus} />
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.leftContainer}>
        <Image
          source={{ uri: `http://${ipAddress}:8000/${vehicle.images[0]}` }}
          style={styles.image}
        />
      </View>

      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.cardLabel}>
            {truncate(post.title, 30)}
          </Text>
          <Text style={styles.locationLabel}>
            {truncate(post.location, 20)}
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
            <Icon name="comment" size={10} color={Color.dark}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    display: "flex",
    width: "100%",
    height: sizeManager(15),
    flexDirection: "row",
    backgroundColor: Color.white,
    alignItems: "center",
    gap: sizeManager(1),
    borderRadius: sizeManager(2),
    elevation: 5
  },
  leftContainer: {
    flex: 0.7,
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
    alignItems: "left",
    paddingHorizontal: sizeManager(1)
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
  }
});

export default VehicleCard;
