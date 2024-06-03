import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Alert
} from "react-native";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import {
  Color,
  FontFamily,
  StatusColors,
  sizeManager
} from "../../constants/GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { ServiceSwitch, SpecsDisplay } from "../../components/misc";
import RenterSummaryCard from "../../components/renterSummaryCard";
import Icon from "react-native-vector-icons/FontAwesome";
import DotIndicator from "../../components/dotIndicator";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CommentComponent from "../../components/comment";
import { FlatList as InsideFlatList } from "react-native-gesture-handler";
import { ipAddress } from "../../constants/misc";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { validateUserExistance } from "../../constants/CPU";

const PostCard = () => {
  const { post } = useLocalSearchParams();
  const { user, services, comments, vehicle } = post;
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          setCurrentUserId(userId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(
    () => {
      if (currentUserId) {
        checkIfFavorite(currentUserId, post._id);
      }
    },
    [currentUserId]
  );

  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const checkIfFavorite = async (userId, postId) => {
    const userExists = await validateUserExistance();
    if (!userExists) {
      return;
    }
    const userData = { postId };
    try {
      const response = await axios.post(
        `http://${ipAddress}:8000/user/checkIsFavorite/${userId}`,
        userData
      );
      if (response.data && response.data.isFavorite) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const handleFavoritize = async () => {
    const userExists = await validateUserExistance();
    if (!userExists) {
      Alert.alert(
        "Login Required",
        "You must be logged-in in order to favoritize a post",
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
    const userData = { postId: post._id };
    try {
      const response = await axios.post(
        `http://${ipAddress}:8000/user/favorites/${currentUserId}`,
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

  const checkOrCreateChat = async (senderId, receiverId) => {
    try {
      const response = await axios.post(
        `http://${ipAddress}:8000/chats/checkOrCreate`,
        {
          senderId,
          receiverId
        }
      );

      if (response.status === 200) {
        return response.data.chatId;
      } else {
        throw new Error("Failed to check or create chat");
      }
    } catch (error) {
      console.error("Error in checkOrCreateChat:", error);
      throw error;
    }
  };

  const handleOpenChat = async () => {
    const userExists = await validateUserExistance();
    if (!userExists) {
      Alert.alert(
        "Login Required",
        "You must be logged-in in order to chat",
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
      const chatId = await checkOrCreateChat(currentUserId, user._id);
      navigation.navigate("screens/chatScreen", {
        receiver: user,
        senderId: currentUserId,
        chatId: chatId
      });
    } catch (error) {
      console.error("Error in handleOpenChat:", error);
    }
  };
  const openBookingScreen = async () => {
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
    navigation.navigate("screens/(bookingScreens)/bookingScreen", {
      post
    });
  };

  const openDialScreen = number => {
    const url = Platform.OS === "ios" ? `telprompt:${number}` : `tel:${number}`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error("An error occurred", err));
  };

  const renderImageItem = ({ item }) =>
    <Image
      source={{ uri: `http://${ipAddress}:8000/${item}` }}
      style={{ aspectRatio: 5 / 3, resizeMode: "contain" }}
    />;

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  const renderTabBar = props =>
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: "white",
        elevation: 5,
        borderRadius: sizeManager(3)
      }}
      style={{
        backgroundColor: Color.dark,
        borderBottomRightRadius: sizeManager(2),
        borderBottomLeftRadius: sizeManager(2),
        marginBottom: sizeManager(1)
      }}
      labelStyle={{
        fontFamily: FontFamily.ubuntuRegular,
        fontSize: 14,
        textTransform: "capitalize"
      }}
    />;

  const mapTrueFalse = str => {
    if (str === "False") {
      return "No";
    } else {
      return "Yes";
    }
  };

  const DescriptionRoute = () =>
    <View style={styles.tabContent}>
      <Text style={styles.descriptionContainer}>
        {post.description}
      </Text>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Make - Model - Variant</Text>
      </View>
      <View style={styles.detailsSubContainer}>
        <SpecsDisplay
          iconName={"car-info"}
          specLabel={vehicle.make}
          triplePerRow={true}
        />
        <SpecsDisplay
          iconName={"palette-swatch-variant"}
          specLabel={vehicle.model}
          triplePerRow={true}
        />
        <SpecsDisplay
          iconName={"calendar"}
          specLabel={vehicle.year}
          triplePerRow={true}
        />
      </View>
      {/* Specification */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Specifications</Text>
      </View>
      <View style={styles.detailsSubContainer}>
        <SpecsDisplay iconName={"engine"} specLabel={vehicle.engine} />
        <SpecsDisplay
          iconName={"car-shift-pattern"}
          specLabel={vehicle.transmission}
        />
        <SpecsDisplay
          iconName={"car-seat-cooler"}
          specLabel={mapTrueFalse(vehicle.AC.toString())}
        />
        <SpecsDisplay iconName={"car-seat"} specLabel={vehicle.seats} />

        <SpecsDisplay
          iconName={"car-brake-abs"}
          specLabel={mapTrueFalse(vehicle.absBrakes.toString())}
        />

        <SpecsDisplay
          iconName={"car-cruise-control"}
          specLabel={mapTrueFalse(vehicle.cruise.toString())}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Renter Details</Text>
      </View>
      <View style={styles.detailsSubContainer}>
        <RenterSummaryCard user={user} />
      </View>
    </View>;

  const ServiceRoute = () =>
    <View style={styles.tabContent}>
      <InsideFlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) =>
          <ServiceSwitch
            serviceLabel={item.label}
            isEnabled={item.isEnabled}
            disableToggle={true}
          />}
      />
    </View>;

  const CommentsRoute = () =>
    <View style={styles.tabContent}>
      {comments.length > 0
        ? <InsideFlatList
            data={comments}
            renderItem={({ item }) => <CommentComponent comment={item} />}
          />
        : <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Icon
                name="code"
                size={sizeManager(20)}
                color={Color.lightGrey}
              />
              <Text
                style={{ fontSize: sizeManager(5), color: Color.lightGrey }}
              >
                No comments
              </Text>
            </View>
          </View>}
    </View>;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "description", title: "Description" },
    { key: "services", title: "Services" },
    { key: "comments", title: "Comments" }
  ]);

  const renderScene = SceneMap({
    description: DescriptionRoute,
    services: ServiceRoute,
    comments: CommentsRoute
  });

  const renderItem = ({ item }) => {
    switch (item.key) {
      case "header":
        return (
          <View style={styles.postHeader}>
            <View style={styles.headerSectionLeft}>
              <Text style={styles.title}>
                {post.title}
              </Text>
              <Text style={styles.subTitle}>
                {post.location}
              </Text>
            </View>
            <View style={styles.headerSectionRight}>
              <View style={styles.statusIndicatorContainer}>
                <View
                  style={styles.statusIndicatorStyle(
                    post.availability
                      ? StatusColors.available
                      : StatusColors.unavailable
                  )}
                />
                <Text style={styles.status}>
                  {post.availability ? "Available" : "Unavailable"}
                </Text>
              </View>
            </View>
          </View>
        );
      case "images":
        return (
          <View
            style={{
              flex: 2,
              width: "100%",
              aspectRatio: 4.5 / 3,
              marginVertical: sizeManager(2),
              justifyContent: "center",
              borderRadius: sizeManager(4)
            }}
          >
            <FlatList
              ref={flatListRef}
              data={vehicle.images}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={wp(96)}
              snapToAlignment="center"
              decelerationRate="fast"
              // viewabilityConfig={viewabilityConfig}
              // onViewableItemsChanged={onViewableItemsChanged}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: sizeManager(4)
              }}
            />
            <DotIndicator
              currentIndex={currentIndex}
              totalImages={vehicle.images.length}
            />
          </View>
        );
      case "tabView":
        return (
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: wp(100) }}
            renderTabBar={renderTabBar}
            style={{
              flex: 1,
              height: "auto",
              maxHeight: sizeManager(500),
              minHeight: sizeManager(80),
              width: "100%",
              backgroundColor: Color.white
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerTintColor: Color.dark,
          headerRight: () =>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity onPress={handleOpenChat}>
                <Icon name="wechat" size={sizeManager(3)} color={Color.dark} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleFavoritize}>
                <Icon
                  name={isFavorite ? "heart" : "heart-o"}
                  size={sizeManager(3)}
                  color={Color.dark}
                />
              </TouchableOpacity>
            </View>
        }}
      />
      <FlatList
        data={[{ key: "header" }, { key: "images" }, { key: "tabView" }]}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={{
          paddingHorizontal: sizeManager(1),
          justifyContent: "center"
        }}
      />
      <View style={styles.footer}>
        <View style={styles.rentLabelContainer}>
          <Text style={styles.rentLabel}>
            {post.rent} Rs./Day
          </Text>
        </View>
        <TouchableOpacity style={styles.bookBtn} onPress={openBookingScreen}>
          <Icon name="calendar-check-o" size={20} color={Color.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dialBtn}
          onPress={() => openDialScreen(user.phoneNo)}
        >
          <Icon name="phone" size={20} color={Color.dark} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    padding: wp(2)
  },
  postHeader: {
    flex: 1,
    gap: 5,
    flexDirection: "row",
    margin: wp(0.5),
    paddingVertical: wp(1),
    paddingHorizontal: wp(3),
    borderWidth: wp(0.2),
    borderRadius: wp(5),
    borderColor: Color.dark,
    justifyContent: "space-between",
    alignItems: "center"
  },
  imageContainer: {
    marginVertical: wp(2),
    borderRadius: wp(4),
    width: wp(96),
    aspectRatio: 4 / 3
  },
  headerSectionLeft: {
    flex: 1,
    justifyContent: "center",
    marginVertical: wp(2)
  },
  headerSectionRight: {
    flex: 0.4,
    justifyContent: "center",
    marginVertical: wp(2),
    paddingHorizontal: sizeManager(1)
  },
  title: {
    fontFamily: FontFamily.ubuntuMedium,
    fontSize: hp(3),
    color: Color.dark
  },
  subTitle: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(2),
    color: Color.grey
  },
  statusIndicatorStyle: statusColor => ({
    width: wp(5),
    height: wp(5),
    borderRadius: wp(50),
    backgroundColor: statusColor
  }),
  statusIndicatorContainer: {
    flexDirection: "row",
    alignContent: "center"
  },
  status: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(2),
    color: Color.dark,
    paddingHorizontal: wp(1)
  },
  labelContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginVertical: wp(2)
  },
  label: {
    fontFamily: FontFamily.ubuntuMedium,
    fontSize: hp(2.5),
    color: Color.dark
  },
  tabContent: {
    flex: 1,
    // height: sizeManager(100),
    paddingVertical: sizeManager(2),
    paddingHorizontal: wp(5),
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
    borderColor: Color.dark,
    borderTopWidth: wp(0.2),
    borderLeftWidth: wp(0.2),
    borderRightWidth: wp(0.2)
  },
  descriptionContainer: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: wp(4),
    color: Color.grey,
    textAlign: "justify"
  },
  detailsSubContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: wp(2),
    paddingVertical: sizeManager(0.5),
    justifyContent: "space-between",
    borderTopWidth: sizeManager(0.3),
    borderRightWidth: sizeManager(0.1),
    borderLeftWidth: sizeManager(0.1),
    borderTopLeftRadius: sizeManager(2),
    borderTopRightRadius: sizeManager(2),
    borderColor: Color.dark,
    backgroundColor: Color.lightGrey
  },
  rentLabelContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.white,
    height: sizeManager(8),
    paddingVertical: sizeManager(2),
    borderRadius: sizeManager(100),
    borderWidth: sizeManager(0.1),
    borderColor: Color.dark,
    elevation: 10
  },
  dialBtn: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    height: sizeManager(8),
    paddingVertical: sizeManager(2),
    borderRadius: sizeManager(100),
    backgroundColor: Color.white,
    elevation: 3,
    borderColor: Color.dark,
    borderWidth: sizeManager(0.1),
    marginHorizontal: sizeManager(0.5)
  },
  bookBtn: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    height: sizeManager(8),
    paddingVertical: sizeManager(2),
    borderRadius: sizeManager(100),
    backgroundColor: Color.dark,
    elevation: 3,
    borderColor: Color.dark,
    borderWidth: sizeManager(0.1),
    marginHorizontal: sizeManager(0.5)
  },
  rentLabel: {
    fontFamily: FontFamily.ubuntuBold,
    color: Color.dark,
    fontSize: 18,
    paddingVertical: wp(1)
  }
});

export default PostCard;
