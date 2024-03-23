import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { Color, FontFamily, StatusColors } from "../../constants/GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { SpecsDisplay } from "../../components/misc";
import RenterSummaryCard from "../../components/renterSummaryCard";
import Icon from "react-native-vector-icons/FontAwesome";

const PostCard = () => {
  const { currentVehicle } = useLocalSearchParams();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerTintColor: Color.dark
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
      <View style={styles.endButtonContainer}>
        <TouchableOpacity style={styles.endButton}>
          <Icon name="wechat" size={20} color={Color.white} />
          <Text style={styles.buttonLabels}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.endButton}>
          <Icon name="phone" size={20} color={Color.white} />
          <Text style={styles.buttonLabels}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.endButton}>
          <Icon name="calendar-check-o" size={20} color={Color.white} />
          <Text style={styles.buttonLabels}>Book</Text>
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
  endButtonContainer: {
    flexDirection: "row",
    width: wp(100),
    paddingHorizontal: wp(2)
  },
  endButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.dark,
    height: wp(15),
    borderColor: Color.white,
    borderLeftWidth: wp(0.2),
    borderRightWidth: wp(0.2)
  },
  buttonLabels: {
    fontFamily: FontFamily.ubuntuLight,
    color: Color.white,
    paddingVertical: wp(1)
  }
});

export default PostCard;
