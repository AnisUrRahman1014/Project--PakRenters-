import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  Color,
  FontFamily,
  sizeManager
} from "../../../constants/GlobalStyles";
import {
  CustomFormInputField,
  LargeBtnWithIcon
} from "../../../components/misc";
import axios from "axios";
import { ipAddress } from "../../../constants/misc";

const FeaturePostScreen = () => {
  const { post } = useLocalSearchParams();
  const navigation = useNavigation();
  const [days, setDays] = useState("0");
  const [charges, setCharges] = useState(0);

  const handleCharges = text => {
    setDays(text);
    setCharges(parseInt(text) * 30);
  };

  const handleNoFeature = () => {
    navigation.navigate("index");
  };

  const handleFeaturePost = () => {
    if (days > 0) {
      updateDatabase();
      navigation.navigate("index");
    } else {
      Alert.alert("Error", "Cannot feature with empty days");
    }
  };

  const updateDatabase = async () => {
    try {
      const response = await axios.post(
        `http://${ipAddress}:8000/post/updateFeatureDetails/${post._id}`,
        { days: parseInt(days), charges: parseInt(charges) }
      );
      if (response.status === 200) {
        Alert.alert("Success", response.data.message);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      let errorMessage = "An error occurred";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      Alert.alert("Error", errorMessage);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Text style={styles.desc}>
          Attract more customers by keeping your add on the top of the listing.
        </Text>
        <View style={styles.chargesContainer}>
          <View style={styles.chargesContainer.leftContainer}>
            <Text
              style={{
                fontFamily: FontFamily.breeSerifRegular,
                fontSize: 20,
                color: Color.dark
              }}
            >
              Feature for:
            </Text>
          </View>
          <View style={styles.chargesContainer.rightContainer}>
            <CustomFormInputField
              placeHolder={"Day/s"}
              isIcon={false}
              keyboardType="numeric"
              value={days}
              onChange={text => {
                handleCharges(text);
              }}
            />
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "flex-end" }}>
          <Text style={{ color: Color.grey }}>Charges per day: 30 Rs.</Text>
        </View>
      </View>
      <View
        style={{
          height: "20%",
          width: "100%",
          padding: sizeManager(2),
          paddingHorizontal: sizeManager(10),
          gap: 10,
          backgroundColor: Color.white
        }}
      >
        <LargeBtnWithIcon
          btnLabel={`Feature for ${charges} Rs.`}
          btnColor={Color.focus}
          icon={"money"}
          iconColor={Color.white}
          btnBorderColor={Color.dark}
          onPress={handleFeaturePost}
        />
        <LargeBtnWithIcon
          btnLabel={`Exit without featuring`}
          btnLabelColor={Color.dark}
          btnColor={Color.white}
          icon={"times-circle"}
          iconColor={Color.dark}
          btnBorderColor={Color.dark}
          onPress={handleNoFeature}
        />
      </View>
    </SafeAreaView>
  );
};

export default FeaturePostScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    padding: sizeManager(2)
  },
  desc: {
    fontSize: 14,
    fontFamily: FontFamily.ubuntuMedium,
    color: Color.grey
  },
  chargesContainer: {
    width: "100%",
    height: sizeManager(10),
    borderTopWidth: sizeManager(0.2),
    borderBottomWidth: sizeManager(0.2),
    borderColor: Color.dark,
    marginTop: sizeManager(2),
    flexDirection: "row",
    leftContainer: {
      flex: 0.7,
      justifyContent: "center",
      paddingHorizontal: sizeManager(2)
    },
    rightContainer: {
      flex: 0.3,
      justifyContent: "center",
      paddingHorizontal: sizeManager(2)
    }
  }
});
