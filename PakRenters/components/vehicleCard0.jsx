import { React, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform
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
import { ipAddress } from "../constants/misc";
import axios from "axios";
import User from "../app/classes/User";
import Post from "../app/classes/Post0";
import Vehicle from "../app/classes/Vehicle0";

const VehicleCard = ({ postId }) => {
  const [post, setPost] = useState(null);
  const navigation = useNavigation();
  const [vehicle, setVehicle] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);

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
      setIsFeatured(true);
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

  const openVehicleDetailCard = () => {
    navigation.navigate("screens/postCard", {
      post: post
    });
  };

  const truncate = (title, maxSize) => {
    return title.length > maxSize ? `${title.substring(0, maxSize)}...` : title;
  };

  if (!post) {
    return <Text>Loading...</Text>; // Show a loading indicator while fetching data
  }
  console.log(post);

  return (
    <TouchableOpacity style={styles.card} onPress={openVehicleDetailCard}>
      {/* Image Container */}
      <View style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          {vehicle &&
            vehicle.images &&
            vehicle.images.length > 0 &&
            <Image
              source={{ uri: `http://${ipAddress}:8000/${vehicle.images[0]}` }}
              style={styles.image}
            />}
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "8%",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        {isFeatured &&
          <View style={styles.featuredLabelContainer}>
            <Text style={styles.featuredLabel}>Featured</Text>
          </View>}
        <View
          style={{
            borderRadius: sizeManager(100),
            width: "12%",
            aspectRatio: 1,
            backgroundColor: post.availability
              ? StatusColors.available
              : StatusColors.unavailable,
            margin: sizeManager(1),
            elevation: 10
          }}
        />
      </View>
      {/* Description Container */}
      <View style={styles.descContainer}>
        <Text style={styles.cardLabel}>
          {truncate(post.title, 30)}
        </Text>
        <Text style={styles.locationLabel}>
          {truncate(post.location, 20)}
        </Text>
        <View style={styles.rateCommentContainer}>
          <Icon
            name="star"
            size={wp(3)}
            color={Color.focus}
            style={{ marginRight: wp(2) }}
          >
            <Text style={styles.rating}>
              {post.rating}
            </Text>
          </Icon>
          <Icon name="comment" size={wp(3)} color={Color.dark}>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",
    width: sizeManager(20),
    aspectRatio: 9 / 14,
    backgroundColor: Color.white,
    marginHorizontal: wp(1),
    marginVertical: wp(1.5),
    borderRadius: wp(5),
    justifyContent: "center",
    alignItems: "center",
    elevation: 9,
    borderWidth: wp(0.1),
    borderColor: Color.dark
  },
  cardLabel: {
    fontFamily: FontFamily.ubuntuBold,
    color: Color.dark,
    ...Platform.select({
      android: {
        fontSize: wp(4.5)
      },
      ios: {
        fontSize: wp(4.5)
      },
      default: {
        fontSize: wp(2.5)
      }
    })
  },
  locationLabel: {
    fontFamily: FontFamily.ubuntuLight,
    fontSize: wp(3.5),
    color: Color.dark
  },
  rating: {
    fontFamily: FontFamily.ubuntuLight,
    fontSize: wp(3),
    color: Color.dark
  },
  rateCommentContainer: {
    flexDirection: "row",
    paddingTop: wp(0.5),
    paddingRight: wp(0.5),
    alignItems: "center"
  },
  imageContainer: {
    flex: 1
  },
  image: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    ...Platform.select({
      android: {
        width: wp(35),
        height: wp(30.5),
        borderRadius: wp(2.5)
      },
      ios: {
        width: wp(35),
        height: wp(30.5),
        borderRadius: wp(2.5)
      },
      default: {
        width: wp(20),
        height: wp(15.5),
        borderRadius: wp(1)
      }
    }),

    margin: wp(2),
    marginBottom: wp(0)
  },
  rentLabelContainer: {
    backgroundColor: Color.focus,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      android: {
        borderRadius: wp(2),
        width: wp(36),
        height: wp(6)
      },
      ios: {
        borderRadius: wp(2),
        width: wp(36),
        height: wp(6)
      },
      default: {
        borderRadius: wp(2),
        width: wp(36),
        height: wp(6)
      }
    }),

    marginTop: wp(2),
    padding: wp(0.2)
  },
  rentLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: wp(4),
    color: Color.dark
  },
  descContainer: {
    padding: wp(2),
    justifyContent: "top",
    flex: 1
  },
  featuredLabelContainer: {
    // position: "absolute",
    backgroundColor: Color.focus,
    width: "55%",
    height: "100%",
    // top: "0%",
    // left: "0%",
    paddingHorizontal: "5%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  featuredLabel: {
    fontFamily: FontFamily.ubuntuRegular
  }
});

export default VehicleCard;
