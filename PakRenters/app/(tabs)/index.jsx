import "react-native-get-random-values";
import { router, useNavigation } from "expo-router";
import { React, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily, sizeManager } from "../../constants/GlobalStyles";
import SearchBar from "../../components/searchBar";
import CategoryBtn from "../../components/categoryBtn";
import VehicleCard from "../../components/vehicleCard0";
// import Vehicle from "../classes/Vehicle";
import Vehicle from "../classes/Vehicle0";
import Post from "../classes/Post0.js";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { ipAddress } from "../../constants/misc";
import User from "../classes/User.js";

const categories = [
  "car",
  "motorbike",
  "bus",
  "truck-flatbed",
  "truck",
  "excavator"
];

const dummyImages = [
  require("../../assets/images/civic003.jpg"),
  require("../../assets/images/civic003.jpg")
];

const vehicles = [
  // new Vehicle(
  //   1,
  //   "Honda",
  //   "Civic EK",
  //   "2005",
  //   "1.6 cc",
  //   5,
  //   "Manual",
  //   "No",
  //   "Yes",
  //   "No",
  //   "Islamabad,Punjab",
  //   3500,
  //   250,
  //   4.9,
  //   dummyImages
  // ),
  // new Vehicle(
  //   2, // Assuming '1' as an ID for this example
  //   "Toyota",
  //   "Prado",
  //   "2012", // vehicleName
  //   "2.0 cc",
  //   7,
  //   "Auto",
  //   "Yes",
  //   "Yes",
  //   "Yes",
  //   "Gujrat, Punjab", // location
  //   "5000", // rent
  //   "43", // comments
  //   "1.0", // rating
  //   [require("../../assets/images/toyota-prado-1.jpg")] // image
  // ),
  // new Vehicle(
  //   3,
  //   "Honda",
  //   " Civic EK",
  //   "2005",
  //   "1.6 cc",
  //   5,
  //   "Manual",
  //   "No",
  //   "Yes",
  //   "No",
  //   "Islamabad,Punjab",
  //   3500,
  //   250,
  //   4.9,
  //   [require("../../assets/images/civic003.jpg")]
  // )
];

const Home = () => {
  const navigation = useNavigation();
  const [featuredPosts, setFeaturedPosts] = useState([]);
  // Dummy Data
  const isLoading = false;
  const error = false;

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  const fetchFeaturedPosts = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddress}:8000/post/featured`
      );
      // Transform the data
      const newPosts = response.data.data.map(item => {
        const { vehicleId, user, ...post } = item;
        const newVehicle = prepareVehicleObject(vehicleId);
        const newUser = prepareUserObject(user);
        const newPost = preparePostObject(post, newUser);
        newPost.setVehicle(newVehicle);
        return newPost;
      });
      setFeaturedPosts(newPosts);
    } catch (err) {
      console.error(err);
      // setError(true);
      // setIsLoading(false);
    }
  };
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
    return user;
  };

  const preparePostObject = (fetchedPost, user) => {
    console.log(fetchedPost);
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

  const handleBundleRequestOnPress = () => {
    navigation.navigate("screens/bundleRequestForm");
  };
  const renderItem = ({ item }) => {
    switch (item.key) {
      case "header":
        return (
          <View>
            <View style={styles.tagLineContainer}>
              <Text style={styles.heading1}>Welcome to PakRenters</Text>
              <Text style={styles.heading2}>
                Your ultimate renting companion
              </Text>
            </View>

            <View style={styles.searchBarContainer}>
              <SearchBar />
            </View>
          </View>
        );
      case "categories":
        return (
          <View>
            {/* CATEGORY LABEL */}
            <View style={styles.sectionLabelContainer}>
              <Text style={styles.sectionLabelPrimary}>Categories</Text>
            </View>

            {/* CATEGORY CONTAINER */}
            <View style={styles.section}>
              <FlatList
                data={categories}
                renderItem={({ item }) => <CategoryBtn iconName={item} />}
                numColumns={3}
                contentContainerStyle={{
                  alignContent: "center",
                  justifyContent: "center"
                }}
                keyExtractor={item => item}
              />
            </View>
          </View>
        );
      case "featuredAds":
        return (
          <View>
            {/* FEATURED LABEL */}
            <View style={styles.sectionLabelContainer}>
              <Text style={styles.sectionLabelPrimary}>Featured</Text>
              <TouchableOpacity>
                <Text style={styles.sectionLabelSecondary}>View all</Text>
              </TouchableOpacity>
            </View>
            {/* FEATURED CONTAINER */}
            <View style={[styles.section, { justifyContent: "center" }]}>
              {isLoading
                ? <ActivityIndicator size={"large"} color={Color.dark} />
                : <FlatList
                    data={featuredPosts}
                    renderItem={({ item }) => <VehicleCard post={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{
                      alignItems: "center",
                      paddingVertical: wp(3)
                    }}
                  />}
            </View>
          </View>
        );
      case "bundleRequest":
        return (
          <View>
            {/* FEATURED LABEL */}
            <View style={styles.sectionLabelContainer}>
              <Text style={styles.sectionLabelPrimary}>Request Bundle</Text>
            </View>
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.bundleBtn}
                onPress={handleBundleRequestOnPress}
              >
                <View style={styles.bundleBtn.iconContainer}>
                  <View style={styles.bundleBtn.iconInnerContainer}>
                    <Icon name="briefcase" size={30} color={Color.white} />
                  </View>
                </View>
                <View style={styles.bundleBtn.contentContainer}>
                  <Text style={styles.bundleBtn.label}>
                    Request Vehicle Bundle
                  </Text>
                </View>
                <View style={styles.bundleBtn.endContainer}>
                  <Icon
                    name="chevron-circle-right"
                    size={25}
                    color={Color.white}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <FlatList
          data={[
            { key: "header" },
            { key: "categories" },
            { key: "featuredAds" },
            { key: "bundleRequest" }
          ]}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          contentContainerStyle={{
            paddingTop: sizeManager(2),
            paddingBottom: sizeManager(10)
          }}
        />
        {/* Post Ad Icon */}
        <View style={styles.postAdBtnContainer}>
          <TouchableOpacity
            style={styles.postAdBtn}
            onPress={() => {
              router.push("../screens/(postAdScreens)/postDetailScreen");
            }}
          >
            <Icon name="plus" color={Color.white} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: sizeManager(1)
  },
  tagLineContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: wp(10)
  },
  heading1: {
    fontFamily: FontFamily.ubuntuBold,
    fontSize: hp(3),
    color: Color.dark
  },
  heading2: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(2),
    color: Color.focus
  },
  searchBarContainer: {
    flex: 0.1,
    marginVertical: hp(2),
    alignItems: "center",
    justifyContent: "center"
  },
  sectionLabelContainer: {
    flex: 0.05,
    flexDirection: "row",
    width: "100%",
    marginVertical: wp(1),
    justifyContent: "space-between",
    alignItems: "center"
  },
  sectionLabelPrimary: {
    fontFamily: FontFamily.ubuntuBold,
    fontSize: hp(2.5),
    color: Color.dark
  },
  sectionLabelSecondary: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(1.8),
    color: Color.grey
  },
  section: {
    flex: 0.3,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: wp(2),
    alignItems: "top"
  },
  postAdBtnContainer: {
    position: "absolute",
    bottom: 30,
    right: 10,
    width: wp("90%"),
    height: hp(6),
    justifyContent: "center",
    alignItems: "flex-end"
  },
  postAdBtn: {
    backgroundColor: Color.dark,
    borderRadius: wp(100),
    aspectRatio: 1 / 1,
    width: wp(15),
    height: wp(15),
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },
  bundleBtn: {
    flex: 1,
    backgroundColor: Color.dark,
    flexDirection: "row",
    padding: sizeManager(1),
    borderRadius: sizeManager(100),
    elevation: 5,
    label: {
      fontFamily: FontFamily.ubuntuRegular,
      fontSize: 16,
      color: Color.white
    },
    iconContainer: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    contentContainer: {
      flex: 0.7,
      justifyContent: "center",
      alignItems: "center"
    },
    iconInnerContainer: {
      width: "70&",
      aspectRatio: 1
    },
    endContainer: {
      flex: 0.2,
      justifyContent: "center",
      alignItems: "center"
    }
  }
});

export default Home;
