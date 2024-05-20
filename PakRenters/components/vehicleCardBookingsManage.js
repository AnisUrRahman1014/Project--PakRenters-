import { React, useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {
  Color,
  FontFamily,
  StatusColors,
  sizeManager
} from "../constants/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";

const VehicleCard = ({ vehicle }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handlePress = () => {
    setIsFocused(isFocused ? false : true);
  };
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.leftContainer}>
        <Image source={vehicle.image} style={styles.image} />
      </View>

      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.cardLabel}>
            {vehicle.toString()}
          </Text>
          <Text style={styles.locationLabel}>
            {vehicle.location}
          </Text>
          <View style={styles.rateCommentContainer}>
            <Icon
              name="star"
              size={10}
              color={Color.focus}
              style={{ marginRight: wp(2) }}
            >
              <Text style={styles.rating}>
                {vehicle.rating}
              </Text>
            </Icon>
            <Icon name="comment" size={10} color={Color.white}>
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
    backgroundColor: Color.dark,
    alignItems: "center",
    gap: sizeManager(1),
    borderRadius: sizeManager(2),
    elevation: 5,
    backgroundColor: Color.dark
  },
  leftContainer: {
    flex: 0.7,
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
    alignItems: "left"
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
    color: Color.white
  },
  locationLabel: {
    fontFamily: FontFamily.ubuntuLight,
    fontSize: 14,
    color: Color.white
  },
  rating: {
    fontFamily: FontFamily.ubuntuLight,
    fontSize: 12
  },
  rateCommentContainer: {
    flexDirection: "row"
  },
  rentLabelContainer: {
    width: "50%",
    backgroundColor: Color.focus,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizeManager(0.5)
  },
  rentLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 16
  }
});

export default VehicleCard;
