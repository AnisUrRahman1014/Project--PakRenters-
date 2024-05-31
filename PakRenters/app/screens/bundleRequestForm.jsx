import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import { Color, FontFamily, sizeManager } from "../../constants/GlobalStyles";
import { CustomFormInputField } from "../../components/misc";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ipAddress } from "../../constants/misc";

const BundleRequestForm = () => {
  const [description, setDescription] = useState();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchLoggedInUserId();
  }, []);

  const fetchLoggedInUserId = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendRequest = async () => {
    try {
      const response = await axios.post(
        `http://${ipAddress}:8000/customRequests/postRequest/${userId}`,
        { request: description }
      );
      if (response.status === 201) {
        Alert.alert("Success", " Request posted successfully");
      } else {
        Alert.alert("Error", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>
            You can request a vehicle bundle for any of your events. A Vehicle
            bundle contains a set of vehicles requested by the user such as: 5
            Black Toyota Grande
          </Text>
          <Text style={styles.subTitle}>
            Note: The request must be finalized 2 weeks before the event
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>
            Please provide the complete detail of your request:
          </Text>
          <CustomFormInputField
            placeHolder="e.g. I want 5 grandes in black (model: 2020 or above) without driver and a prado in White with driver."
            value={description}
            onChange={setDescription}
            width={"100%"}
            multiline={true}
            isIcon={false}
          />
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.bundleBtn}
            onPress={() => {
              handleSendRequest();
            }}
          >
            <View style={styles.bundleBtn.contentContainer}>
              <Text style={styles.bundleBtn.label}>Send Request</Text>
            </View>
            <View style={styles.bundleBtn.endContainer}>
              <Icon name="chevron-circle-right" size={25} color={Color.white} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BundleRequestForm;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: sizeManager(3),
    paddingVertical: sizeManager(1)
  },
  header: {
    paddingVertical: sizeManager(2)
  },
  title: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 16,
    color: Color.grey,
    textAlign: "justify",
    lineHeight: sizeManager(3)
  },
  subTitle: {
    paddingVertical: sizeManager(1),
    fontFamily: FontFamily.ubuntuBold,
    fontSize: 16,
    color: Color.grey,
    textAlign: "center"
  },
  descriptionLabel: {
    fontFamily: FontFamily.ubuntuMedium,
    fontSize: 16,
    color: Color.dark,
    textAlign: "justify"
  },
  section: {
    flex: 0.3,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: sizeManager(1),
    paddingHorizontal: sizeManager(5),
    alignItems: "top"
  },
  bundleBtn: {
    flex: 1,
    backgroundColor: Color.dark,
    flexDirection: "row",
    marginVertical: sizeManager(1),
    padding: sizeManager(1),
    borderRadius: sizeManager(100),
    elevation: 5,
    label: {
      fontFamily: FontFamily.ubuntuRegular,
      fontSize: 16,
      color: Color.white
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    iconInnerContainer: {
      width: "70&",
      aspectRatio: 1
    },
    endContainer: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    }
  }
});
