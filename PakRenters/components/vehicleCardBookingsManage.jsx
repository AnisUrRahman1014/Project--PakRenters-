import { React } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Color, FontFamily, sizeManager } from "../constants/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "expo-router";
import { ipAddress } from "../constants/misc";

const VehicleCard = ({ post, onPress = null }) => {
  const { vehicle, user } = post;
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate("screens/bookingsScreen_RENTER", { post: post });
  };

  if (onPress === null) {
    onPress = handleOnPress;
  }
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.leftContainer}>
        <Image
          source={{ uri: `http://${ipAddress}:8000/${vehicle.images[0]}` }}
          style={styles.image}
        />
      </View>

      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.cardLabel}>
            {post.title}
          </Text>
          <Text style={styles.locationLabel}>
            {post.location}
          </Text>
          <View style={styles.rateCommentContainer}>
            <Icon
              name="star"
              size={10}
              color={Color.focus}
              style={{ marginRight: wp(2) }}
            >
              <Text style={styles.rating}>
                {post.rating}
              </Text>
            </Icon>
            <Icon name="comment" size={10} color={Color.dark}>
              <Text style={styles.rating}>
                {post.comments.length}
              </Text>
            </Icon>
          </View>

          <View style={styles.rentLabelContainer}>
            <Text style={styles.rentLabel}>
              {post.rent}/- Rs.
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
    backgroundColor: Color.white,
    alignItems: "center",
    gap: sizeManager(1),
    borderRadius: sizeManager(2),
    elevation: 5
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
