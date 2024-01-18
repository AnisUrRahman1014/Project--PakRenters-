import { React } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../constants/GlobalStyles";
import { useFonts } from "expo-font";
import Icon from "react-native-vector-icons/FontAwesome";

const VehicleCard = props => {
  const [fontsLoaded, error] = useFonts({
    "Ubuntu-Bold": require("../assets/fonts/Ubuntu-Bold.ttf"),
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Light": require("../assets/fonts/Ubuntu-Light.ttf")
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.card}>
      <View style={{ padding: wp(3) }}>
        <Text style={styles.cardLabel}>
          {props.cardLabel}
        </Text>
        <Text style={styles.locationLabel}>
          {props.location}
        </Text>
        <View style={styles.rateCommentContainer}>
          <Icon
            name="star"
            size={10}
            color={Color.focus}
            style={{ marginRight: wp(2) }}
          >
            <Text style={styles.rating}>
              {props.rating}
            </Text>
          </Icon>
          <Icon name="comment" size={10} color={Color.white}>
            <Text style={styles.rating}>
              {props.comments}
            </Text>
          </Icon>
        </View>

        <View style={styles.rentLabelContainer}>
          <Text style={styles.rentLabel}>
            {props.rent}/- Rs.
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.imageContainer}>
          <Image source={props.image} style={styles.imageContainer} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  card: {
    position: "relative",
    backgroundColor: Color.dark,
    width: wp(95),
    height: hp(15.5),
    marginHorizontal: wp(1.5),
    marginVertical: hp(1.5),
    borderRadius: wp(5),
    justifyContent: "space-between",
    flexDirection: "row",
    elevation: 9
  },
  cardLabel: {
    fontFamily: FontFamily.ubuntuBold,
    fontSize: 18,
    color: Color.white
  },
  locationLabel: {
    fontFamily: FontFamily.ubuntuLight,
    fontSize: 14,
    color: Color.white
  },
  rating: {
    fontFamily: FontFamily.ubuntuLight,
    fontSize: 12,
    color: Color.white
  },
  rateCommentContainer: {
    flexDirection: "row",
    paddingTop: hp(0.5),
    paddingRight: hp(0.5)
  },
  imageContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    width: wp(33),
    height: hp(15.5),
    backgroundColor: Color.focus,
    borderRadius: wp(5)
  },
  rentLabelContainer: {
    backgroundColor: Color.focus,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp(2),
    width: wp(25),
    height: hp(3),
    marginTop: hp(2),
    padding: wp(0.2)
  },
  rentLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 16,
    color: Color.white
  }
};

export default VehicleCard;
