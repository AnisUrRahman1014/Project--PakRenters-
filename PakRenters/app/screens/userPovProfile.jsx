import {
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import React from "react";
import { Color, FontFamily, sizeManager } from "../../constants/GlobalStyles";
import { useLocalSearchParams, useNavigation } from "expo-router";
import ReputationBar from "../../components/reputationBar";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ipAddress } from "../../constants/misc";

const UserPOVprofile = () => {
  const { user } = useLocalSearchParams();
  const navigation = useNavigation();
  console.log(user);

  const handleOnPress_ViewPosts = () => {
    navigation.navigate("screens/postsViewUserPov", { user: user });
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={{ width: "100%", height: "100%" }}>
          <View style={styles.backgroundTop} />
        </View>
        <View style={styles.floatingContainer}>
          <View style={styles.header}>
            <View style={styles.dpContainer}>
              <Image
                source={{ uri: `http://${ipAddress}:8000/${user.profilePic}` }}
                style={styles.image}
              />
            </View>
            {/* Username */}
            <View style={styles.usernameContainer}>
              <Text style={styles.username}>
                @{user.username}
              </Text>
            </View>
          </View>
          {/* Content Container */}
          <View style={styles.contentContainer}>
            {/* Personal Details */}
            <View style={styles.section}>
              {/* Reputation */}
              <View style={styles.horizontalSection}>
                <Text style={styles.sectionLabel}>Reputation: </Text>
                <ReputationBar reputation={user.reputation} />
              </View>
              {/* Province */}
              <View style={styles.horizontalSection}>
                <Text style={styles.sectionLabel}>Province: </Text>
                <Text style={styles.value}>
                  {user.province}
                </Text>
              </View>

              {/* City */}
              <View style={styles.horizontalSection}>
                <Text style={styles.sectionLabel}>City: </Text>
                <Text style={styles.value}>
                  {user.city}
                </Text>
              </View>
            </View>

            {/* View Posts */}
            <View style={styles.section}>
              {/* Posts */}
              <TouchableOpacity
                style={styles.btnSection}
                onPress={handleOnPress_ViewPosts}
              >
                <View style={styles.btnSection.iconContainer}>
                  <MaterialIcon
                    name="view-headline"
                    size={30}
                    color={Color.dark}
                  />
                </View>
                <View style={styles.btnSection.textContainer}>
                  <Text style={styles.btnSection.label}>View Posts</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Contact */}
            <View style={styles.section}>
              {/* Messages */}
              <TouchableOpacity style={styles.btnSection}>
                <View style={styles.btnSection.iconContainer}>
                  <MaterialIcon name="chat" size={30} color={Color.dark} />
                </View>
                <View style={styles.btnSection.textContainer}>
                  <Text style={styles.btnSection.label}>Send Message</Text>
                </View>
              </TouchableOpacity>
              {/* Call */}
              <TouchableOpacity
                style={styles.btnSection}
                onPress={() => {
                  openDialScreen(user.phoneNo);
                }}
              >
                <View style={styles.btnSection.iconContainer}>
                  <MaterialIcon name="phone" size={30} color={Color.dark} />
                </View>
                <View style={styles.btnSection.textContainer}>
                  <Text style={styles.btnSection.label}>Dial</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserPOVprofile;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundTop: {
    flex: 0.3,
    width: "100%",
    backgroundColor: Color.dark,
    borderBottomRightRadius: sizeManager(5),
    borderBottomLeftRadius: sizeManager(5),
    elevation: 5
  },
  floatingContainer: {
    position: "absolute",
    backgroundColor: Color.white,
    elevation: 20,
    borderRadius: sizeManager(4),
    height: "80%",
    width: "80%"
  },
  header: {
    flex: 0.2,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  dpContainer: {
    position: "relative",
    top: -30,
    height: "100%",
    aspectRatio: 1,
    borderRadius: sizeManager(100),
    backgroundColor: Color.lightGrey,
    elevation: 5
  },
  image: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: sizeManager(100)
  },
  usernameContainer: {
    position: "relative",
    top: -20,
    paddingVertical: sizeManager(0.2)
  },
  username: {
    fontFamily: FontFamily.breeSerifRegular,
    fontSize: 18,
    color: Color.dark
  },
  contentContainer: {
    flex: 0.8,
    padding: sizeManager(2),
    borderBottomLeftRadius: sizeManager(4),
    borderBottomRightRadius: sizeManager(4)
  },
  section: {
    borderColor: Color.dark,
    borderTopWidth: sizeManager(0.1),
    marginTop: sizeManager(0.5),
    paddingVertical: sizeManager(0.5)
  },
  horizontalSection: {
    flexDirection: "row",
    paddingVertical: sizeManager(0.5),
    justifyContent: "space-between",
    alignItems: "space-between"
  },
  sectionLabel: {
    fontFamily: FontFamily.ubuntuMedium,
    fontSize: 14,
    color: Color.dark
  },
  value: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 14,
    color: Color.grey
  },
  btnSection: {
    flexDirection: "row",
    marginTop: sizeManager(1),
    paddingVertical: sizeManager(0.5),
    borderColor: Color.dark,
    borderWidth: sizeManager(0.1),
    paddingHorizontal: sizeManager(0.5),
    label: {
      fontFamily: FontFamily.ubuntuRegular,
      fontSize: 18,
      color: Color.grey
    },
    gap: 5,
    iconContainer: {
      flex: 0.2,
      aspectRatio: 1.5 / 1,
      alignItems: "center",
      justifyContent: "center",
      borderColor: Color.dark,
      borderRightWidth: sizeManager(0.2),
      paddingHorizontal: sizeManager(0.1)
    },
    textContainer: {
      flex: 0.9,
      justifyContent: "center",
      alignItems: "flex-start"
    }
  }
});
