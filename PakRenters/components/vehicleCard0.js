import { StyleSheet, Platform } from "react-native";
import { React, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../constants/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";

const VehicleCard = ({ vehicle }) => {
  const [isFeatured, setIsfeatured] = useState(true);
  const openVehicleDetailCard = () => {
    router.push("/screens/postCard");
    router.setParams({ currentVehicle: vehicle });
  };
  return (
    <TouchableOpacity style={styles.card} onPress={openVehicleDetailCard}>
      {/* Image Container */}
      <View style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <Image source={vehicle.image} style={styles.image} />
        </View>
      </View>
      {isFeatured &&
        <View style={styles.featuredLabelContainer}>
          <Text style={styles.featuredLabel}>Featured</Text>
        </View>}
      {/* Description Container */}
      <View style={styles.descContainer}>
        <Text style={styles.cardLabel}>
          {vehicle.toString()}
        </Text>
        <Text style={styles.locationLabel}>
          {vehicle.location}
        </Text>
        <View style={styles.rateCommentContainer}>
          <Icon
            name="star"
            size={wp(3)}
            color={Color.focus}
            style={{ marginRight: wp(2) }}
          >
            <Text style={styles.rating}>
              {vehicle.rating}
            </Text>
          </Icon>
          <Icon name="comment" size={wp(3)} color={Color.dark}>
            <Text style={styles.rating}>
              {vehicle.comments}
            </Text>
          </Icon>
        </View>

        <View style={styles.rentLabelContainer}>
          <Text style={styles.rentLabel}>
            {vehicle.rent}/- Rs.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",
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
    position: "absolute",
    backgroundColor: Color.focus,
    width: "55%",
    height: "8%",
    top: "0%",
    left: "0%",
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
