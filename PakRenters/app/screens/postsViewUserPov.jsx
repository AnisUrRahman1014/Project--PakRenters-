import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View
} from "react-native";
import React, { useEffect, useState } from "react";
import { Color, sizeManager } from "../../constants/GlobalStyles";
import VehicleCard from "../../components/vehicleCardBookingsManage";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import Vehicle from "../classes/Vehicle0";
import { ipAddress } from "../../constants/misc";
import Post from "../classes/Post0";
import User from "../classes/User";

const PostsViewUserPov = () => {
  const navigation = useNavigation();
  const { user } = useLocalSearchParams();
  const [posts, setPosts] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://${ipAddress}:8000/post/getPostByUserId/${user._id}`
        );
        if (response) {
          // Transform the data
          const userPosts = response.data.data.map(item => {
            const { vehicleId, user, ...post } = item;
            const newVehicle = prepareVehicleObject(vehicleId);
            const newUser = prepareUserObject(user);
            const newPost = preparePostObject(post, newUser);
            newPost.setVehicle(newVehicle);
            return newPost;
          });
          setPosts(userPosts);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
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

  const handleOnPress = post => {
    navigation.navigate("screens/postCard", { post: post });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        {isLoading
          ? <ActivityIndicator
              style={{
                flex: 1
              }}
              size={sizeManager(10)}
              color={Color.focus}
            />
          : <FlatList
              data={posts}
              renderItem={({ item }) =>
                <VehicleCard
                  post={item}
                  onPress={() => {
                    handleOnPress(item);
                  }}
                />}
              contentContainerStyle={{
                gap: 10,
                paddingVertical: sizeManager(1)
              }}
            />}
      </View>
    </SafeAreaView>
  );
};

export default PostsViewUserPov;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: sizeManager(1),
    backgroundColor: Color.white
  }
});
