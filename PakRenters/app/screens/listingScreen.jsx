import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { React, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import { Color, FontFamily, globalStyles } from "../../constants/GlobalStyles";
import VehicleCard from "../../components/vehicleCard0";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import SearchBar from "../../components/searchBar";
import Vehicle from "../classes/Vehicle";
import axios from "axios";
import { ipAddress } from "../../constants/misc";
import Post from "../classes/Post0";
import User from "../classes/User";

const Filters = ["All", "Available", "Unavailable"];

const ListingScreen = () => {
  const { categoryName, filterType } = useLocalSearchParams();
  const [posts, setPosts] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.post(
        `http://${ipAddress}:8000/post/getFilteredPosts/${filterType}`,
        { filter: categoryName.toLowerCase() }
      );
      if (response.status === 200) {
        console.log(response.data.data);
        setPosts(response.data.data);
      } else {
        Alert.alert("Failed to applu the filter", "NAN");
      }
    } catch (error) {
      Alert.alert("Error fetching post", "Failed to fetch your request");
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

  const generateScreenTitle = () => {
    let headerTitle = categoryName;
    if (categoryName.endsWith("s")) {
      headerTitle = headerTitle.concat("es");
    } else {
      headerTitle = headerTitle.concat("s");
    }
    return headerTitle;
  };

  if (!posts) {
    return <Text>Failed</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: generateScreenTitle().toUpperCase(),
          headerTintColor: Color.dark,
          headerTitleAlign: "center",
          headerShadowVisible: false
        }}
      />
      <View style={styles.mainContainer}>
        <View style={styles.searchAndFilterContainer}>
          {/* SEARCH BAR */}
          <SearchBar />
          {/* FILTER BUTTON */}
          <View style={styles.filterBtnContainer}>
            <TouchableOpacity style={styles.filterBtn}>
              <Text style={styles.filter}>Filters</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Container */}
        <View style={styles.categoryContainer}>
          <FlatList
            data={Filters}
            renderItem={({ item }) =>
              <TouchableOpacity style={globalStyles.horizontalFlatListBtn}>
                <Text style={globalStyles.flatListButtonLabelStyle}>
                  {item}
                </Text>
              </TouchableOpacity>}
            keyExtractor={item => item}
            horizontal
            contentContainerStyle={{ columnGap: wp(2) }}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* VEHICLE CARD CONTAINER */}
        <View style={styles.vehicleCardsContainer}>
          <FlatList
            data={posts}
            renderItem={({ item }) => <VehicleCard postId={item._id} />}
            keyExtractor={item => item._id}
            numColumns={2}
            contentContainerStyle={{ alignItems: "center" }}
          />
        </View>

        {/* <ScrollView style={styles.vehicleCardsContainer}>
          <VehicleCard
            cardLabel="Toyota Prado"
            comments="43"
            rating="1.0"
            location="Gujrat, Punjab"
            rent="5000"
            image={require("../assets/images/toyota-prado-1.jpg")}
          />
          <VehicleCard
            cardLabel="Honda Civic EK"
            comments="168"
            rating="10.0"
            location="Islamabad, Punjab"
            rent="3500"
            image={require("../assets/images/civic003.jpg")}
          />
          <VehicleCard
            cardLabel="Honda Civic EK"
            comments="168"
            rating="10.0"
            location="Islamabad, Punjab"
            rent="3500"
            image={require("../assets/images/civic003.jpg")}
          />
          <VehicleCard
            cardLabel="Honda Civic EK"
            comments="168"
            rating="10.0"
            location="Islamabad, Punjab"
            rent="3500"
            image={require("../assets/images/civic003.jpg")}
          />
          <VehicleCard
            cardLabel="Honda Civic EK"
            comments="168"
            rating="10.0"
            location="Islamabad, Punjab"
            rent="3500"
            image={require("../assets/images/civic003.jpg")}
          />
          <VehicleCard
            cardLabel="Honda Civic EK"
            comments="168"
            rating="10.0"
            location="Islamabad, Punjab"
            rent="3500"
            image={require("../assets/images/civic003.jpg")}
          />
          <VehicleCard
            cardLabel="Honda Civic EK"
            comments="168"
            rating="10.0"
            location="Islamabad, Punjab"
            rent="3500"
            image={require("../assets/images/civic003.jpg")}
          />
          <VehicleCard
            cardLabel="Honda Civic EK"
            comments="168"
            rating="10.0"
            location="Islamabad, Punjab"
            rent="3500"
            image={require("../assets/images/civic003.jpg")}
          />
          <VehicleCard
            cardLabel="Honda Civic EK"
            comments="168"
            rating="10.0"
            location="Islamabad, Punjab"
            rent="3500"
            image={require("../assets/images/civic003.jpg")}
          />
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white
  },
  searchAndFilterContainer: {
    flex: 0.2,
    justifyContent: "center"
  },
  vehicleCardsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  headerContainer: {
    flex: 0.3,
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(2.5),
    marginVertical: hp(2)
  },
  header: {
    fontFamily: FontFamily.breeSerifRegular,
    fontSize: hp(4),
    flexWrap: "wrap",
    width: wp(45)
  },
  logoContainer: {
    width: wp(25),
    height: hp(25),
    borderRadius: wp(50),
    resizeMode: "contain"
  },
  filterBtnContainer: {
    paddingHorizontal: wp(6),
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  filter: {
    fontFamily: FontFamily.ubuntuLight,
    fontSize: hp(2.5),
    color: Color.grey
  },
  categoryContainer: {
    flex: 0.08,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(1.8),
    paddingVertical: hp(1)
  },
  category: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(2),
    color: Color.dark
  }
};

export default ListingScreen;
