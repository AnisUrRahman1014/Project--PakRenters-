import { React } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import {
  Color,
  FontFamily,
  StatusColors,
  sizeManager
} from "../constants/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "expo-router";

const VehicleCard = ({ vehicle }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("screens/postCard", { currentVehicle: vehicle });
  };
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.leftContainer}>
        <Image source={vehicle.image[0]} style={styles.image} />
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
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionsContainer.btn}>
          <Icon name="bell-slash" size={sizeManager(3)} color={Color.focus} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionsContainer.btn}>
          <Icon
            name="trash"
            size={sizeManager(3.5)}
            color={StatusColors.unavailable}
          />
        </TouchableOpacity>
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
    backgroundColor: Color.white,
    alignItems: "center",
    gap: sizeManager(1),
    borderRadius: sizeManager(2),
    elevation: 5
  },
  leftContainer: {
    flex: 1,
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
    alignItems: "left",
    backgroundColor: Color.white
  },
  optionsContainer: {
    flex: 0.5,
    backgroundColor: Color.white,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: sizeManager(0.5),
    btn: {
      width: "80%",
      aspectRatio: 1,
      padding: "20%",
      borderColor: Color.dark,
      borderWidth: sizeManager(0.2)
    }
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
    color: Color.dark
  },
  locationLabel: {
    fontFamily: FontFamily.ubuntuLight,
    fontSize: 14,
    color: Color.dark
  },
  rating: {
    fontFamily: FontFamily.ubuntuLight,
    fontSize: 12,
    color: Color.dark
  },
  rateCommentContainer: {
    flexDirection: "row"
  },
  rentLabelContainer: {
    width: "70%",
    backgroundColor: Color.focus,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: sizeManager(0.5),
    paddingHorizontal: sizeManager(0.5),
    paddingVertical: sizeManager(0.2)
  },
  rentLabel: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 16,
    color: Color.white
  }
});

export default VehicleCard;
