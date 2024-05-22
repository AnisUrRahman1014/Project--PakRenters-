import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import React, { useState } from "react";
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
import { SpecsDisplay } from "../../components/misc";
import RenterSummaryCard from "../../components/renterSummaryCard";
import Icon from "react-native-vector-icons/FontAwesome";

const PostCard = () => {
  const { currentVehicle } = useLocalSearchParams();
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();

  const handleFavouritize = () => {
    setIsFavourite(!isFavourite);
  };

  const openBookingScreen = () => {
    navigation.navigate("screens/bookingScreen", { vehicle: currentVehicle });
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

  const handleOpenChat = () => {};
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
              <TouchableOpacity onPress={handleFavouritize}>
                <Icon
                  name={isFavourite ? "heart" : "heart-o"}
                  size={sizeManager(3)}
                  color={Color.dark}
                />
              </TouchableOpacity>
            </View>
        }}
      />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.postHeader}>
          <View style={styles.headerSection}>
            <Text style={styles.title}>
              {currentVehicle.toString()}
            </Text>
            <Text style={styles.subTitle}>
              {currentVehicle.location}
            </Text>
          </View>
          <View style={styles.headerSection}>
            <View style={styles.statusIndicatorContainer}>
              <View
                style={styles.statusIndicatorStyle(StatusColors.available)}
              />
              <Text style={styles.status}>Available</Text>
            </View>
          </View>
        </View>

        {/* A scrollable container to hold the images of the vehicle */}
        <View style={styles.imageContainer}>
          <Image source={currentVehicle.image} style={styles.imageContainer} />
        </View>

        <View style={styles.detailsContainer}>
          {/* DESCRIPTION LABEL */}
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Description</Text>
          </View>

          {/* DESCRIPTION */}
          <Text style={styles.descriptionContainer}>
            Honda Civic EK 2005 model modified. Audionic Sound system installed
            with Air suspension and modified allow rims. Perfect for modeling
            photography, music videos etc.
          </Text>

          {/* VEHICLE MAKE MODEL CONTAINER LABEL*/}
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Make & Model</Text>
          </View>

          {/* VEHICLE MAKE MODEL CONTAINER */}
          <View style={styles.detailsSubContainer}>
            <SpecsDisplay
              iconName={"car-info"}
              specLabel={currentVehicle.make}
            />
            <SpecsDisplay
              iconName={"palette-swatch-variant"}
              specLabel={currentVehicle.model}
            />
          </View>

          {/* VEHICLE SPECS CONTAINER LABEL*/}
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Specifications</Text>
          </View>

          {/* VEHICLE SPECS CONTAINER */}
          <View style={styles.detailsSubContainer}>
            <SpecsDisplay
              iconName={"engine"}
              specLabel={currentVehicle.engine}
            />
            <SpecsDisplay
              iconName={"car-shift-pattern"}
              specLabel={currentVehicle.transmission}
            />
            <SpecsDisplay
              iconName={"car-brake-abs"}
              specLabel={currentVehicle.absBrakes}
            />
            <SpecsDisplay
              iconName={"car-seat"}
              specLabel={currentVehicle.seats}
            />
            <SpecsDisplay
              iconName={"car-cruise-control"}
              specLabel={currentVehicle.cruise}
            />
            <SpecsDisplay
              iconName={"car-traction-control"}
              specLabel={currentVehicle.traction}
            />
          </View>

          {/* RENTER DETAILS LABEL */}
          <View style={styles.label}>
            <Text style={styles.label}>Renter Details</Text>
          </View>
          {/* RENTER DETAILS CONTAINER */}
          <View style={styles.detailsSubContainer}>
            <RenterSummaryCard />
          </View>
        </View>
      </ScrollView>
      {/* Bottom Buttons Container*/}
      <View style={styles.footer}>
        {/* <TouchableOpacity style={styles.endButton}>
          <Icon name="wechat" size={20} color={Color.white} />
          <Text style={styles.buttonLabels}>Message</Text>
        </TouchableOpacity> */}

        {/* Rent Container */}
        <View style={styles.rentLabelContainer}>
          <Text style={styles.rentLabel}>
            {currentVehicle.rent} Rs./Day
          </Text>
        </View>
        {/* Book Btn */}
        <TouchableOpacity style={styles.bookBtn} onPress={openBookingScreen}>
          <Icon name="calendar-check-o" size={20} color={Color.white} />
        </TouchableOpacity>
        {/* Dial btn */}
        <TouchableOpacity
          style={styles.dialBtn}
          onPress={() => openDialScreen("03304089490")}
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
    flex: 2,
    marginVertical: wp(2),
    borderRadius: wp(4),
    width: wp(96),
    height: hp(30),
    resizeMode: "cover"
  },
  headerSection: {
    justifyContent: "center",
    marginVertical: wp(2)
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
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingVertical: wp(3),
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
    textAlign: "left"
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
    backgroundColor: Color.white,
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
