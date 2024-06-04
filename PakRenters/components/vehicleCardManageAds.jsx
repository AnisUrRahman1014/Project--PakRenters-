import { React, useState, useCallback } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import {
  Color,
  FontFamily,
  StatusColors,
  sizeManager
} from "../constants/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useFocusEffect } from "expo-router";
import User from "../app/classes/User";
import Post from "../app/classes/Post0";
import { ipAddress } from "../constants/misc";
import Vehicle from "../app/classes/Vehicle0";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const VehicleCard = ({ postId }) => {
  const [post, setPost] = useState(null);
  const navigation = useNavigation();
  const [vehicle, setVehicle] = useState(null);
  const [isSnoozed, setIsSnoozed] = useState(false);

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
      setIsSnoozed(!newPost.status);
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
    user.idCardPDF = fetchedUser.idCardPDF;
    user.updateReputation();
    user.memberSince = fetchedUser.memberSince;
    user._id = fetchedUser._id;
    user.posts = fetchedUser.posts;

    user.postCount = fetchedUser.posts.length;
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
    newPost.availability = fetchedPost.availability;
    newPost.bookings = fetchedPost.bookings;
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

  const truncate = (title, maxSize) => {
    return title.length > maxSize ? `${title.substring(0, maxSize)}...` : title;
  };
  const handlePress = () => {
    navigation.navigate("screens/postCard", { post: post });
  };

  const handleSnooze = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to snooze the post?\nThe post won't be available in the listing till you turn it back on.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            setIsSnoozed(!isSnoozed);
            snoozePost();
          }
        }
      ],
      { cancelable: false }
    );
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete the post?\nThis step is irreversible.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            deletePost();
          }
        }
      ],
      { cancelable: false }
    );
  };

  const snoozePost = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const response = await axios.post(
          `http://${ipAddress}:8000/post/snoozePost/${post._id}`,
          { update: isSnoozed },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.data.success) {
          Alert.alert("Success", response.data.message);
        } else {
          Alert.alert("Error", "Failed to snooze the post");
        }
      } else {
        Alert.alert("Error snoozing the post", "User does not exist");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while snoozing the post");
    }
  };

  const deletePost = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const response = await axios.delete(
          `http://${ipAddress}:8000/post/deletePost/${post._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.data.success) {
          Alert.alert("Success", "Post deleted successfully");
        } else {
          Alert.alert("Error", "Failed to delete the post and vehicle");
        }
      } else {
        Alert.alert("Error deleting the post", "User does not exist");
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "An error occurred while deleting the post and vehicle"
      );
    }
  };

  if (!post || !vehicle) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Color.white,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ActivityIndicator color={Color.focus} size={sizeManager(5)} />
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
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
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionsContainer.btn}
          onPress={handleSnooze}
        >
          {isSnoozed
            ? <Icon name="bell" size={sizeManager(3)} color={"green"} />
            : <Icon
                name="bell-slash"
                size={sizeManager(3)}
                color={Color.focus}
              />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionsContainer.btn}
          onPress={handleDelete}
        >
          <Icon
            name="trash"
            size={sizeManager(3.5)}
            color={StatusColors.unavailable}
          />
        </TouchableOpacity>
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
    flex: 1,
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
    backgroundColor: Color.white
  },
  optionsContainer: {
    flex: 0.5,
    backgroundColor: Color.white,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: sizeManager(0.5),
    btn: {
      width: "80%",
      aspectRatio: 1,
      padding: "20%",
      borderColor: Color.dark,
      borderWidth: sizeManager(0.2)
    }
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
    width: "70%",
    backgroundColor: Color.focus,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizeManager(0.5),
    paddingHorizontal: sizeManager(0.5),
    paddingVertical: sizeManager(0.2)
  },
  rentLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 16,
    color: Color.white
  }
});

export default VehicleCard;
