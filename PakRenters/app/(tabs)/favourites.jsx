import { StyleSheet, View, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Color, sizeManager } from "../../constants/GlobalStyles";
import FavouritizedPostCard from "../../components/favourtizedPostCard";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { ipAddress } from "../../constants/misc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode"; // Corrected import
import { useFocusEffect } from "@react-navigation/native";
import User from "../classes/User";
import Post from "../classes/Post0";
import Vehicle from "../classes/Vehicle0";

const Favourites = () => {
  const [userId, setUserId] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserIdAndFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
        const response = await axios.post(
          `http://${ipAddress}:8000/user/getFavoritePosts/${decodedToken.userId}`
        );
        if (response.data && response.data.favorites) {
          const newPosts = response.data.favorites.map(item => {
            const { vehicleId, user, ...post } = item;
            const newVehicle = prepareVehicleObject(vehicleId);
            const newUser = prepareUserObject(user);
            const newPost = preparePostObject(post, newUser);
            newPost.setVehicle(newVehicle);
            return newPost;
          });
          setFavourites(newPosts);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const prepareUserObject = fetchedUser => {
    // Create a user first
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
    // Create a post
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

  useFocusEffect(
    useCallback(
      () => {
        fetchUserIdAndFavorites();
      },
      [fetchUserIdAndFavorites]
    )
  );

  const render = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          style={{ flex: 1 }}
          color={Color.focus}
          size={sizeManager(10)}
        />
      );
    }

    if (favourites.length > 0) {
      return (
        <FlatList
          data={favourites}
          renderItem={({ item }) =>
            <FavouritizedPostCard post={item} userId={userId} />}
          contentContainerStyle={styles.flatList}
          alwaysBounceVertical={true}
        />
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Icon name="ban" size={sizeManager(30)} color={Color.lightGrey} />
        </View>
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      {render()}
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: sizeManager(1)
  },
  flatList: {
    gap: 8,
    paddingVertical: sizeManager(1)
  }
});
