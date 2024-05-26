import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert
} from "react-native";
import React, { useState } from "react";
import {
  Color,
  FontFamily,
  sizeManager
} from "../../../constants/GlobalStyles";
import { useLocalSearchParams } from "expo-router";
import {
  CustomFormInputField,
  LargeBtnWithIcon
} from "../../../components/misc";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ipAddress } from "../../../constants/misc";

const ManagePersonalInfo = () => {
  const { user } = useLocalSearchParams();
  const username = user.getUsername();
  const email = user.getEmail();
  const [phoneNo, setPhoneNo] = useState(user.getPhoneNo());
  const [cnic, setCnic] = useState(user.getCNIC());
  const [province, setProvince] = useState(user.getProvince());
  const [city, setCity] = useState(user.getCity());
  const [displayMoreOptions, setDisplayMoreOptions] = useState(false);

  const toggleMoreOptions = () => {
    setDisplayMoreOptions(!displayMoreOptions);
  };

  const moreOptions = [
    {
      label: "Change profile picture",
      function: () => handleProfileChangeRequest
    },
    {
      label: "Apply for verification",
      function: () => handleVerificationRequest
    }
  ];

  const handleProfileChangeRequest = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Need permission to access your gallery"
      );
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1]
    });
    if (!result.canceled) {
      updateInDb(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const updateInDb = async uri => {
    const fileName = uri.split("/").pop();
    const fileType = fileName.split(".").pop();

    const formData = new FormData();
    formData.append("profilePic", {
      name: fileName,
      uri,
      type: `image/${fileType}`
    });

    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert(
          "Unauthorized",
          "Please log in to update your profile picture"
        );
        return;
      }

      const response = await axios.post(
        `http://${ipAddress}:8000/updateProfilePic/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Profile picture updated successfully.");
        // Optionally, update the local user state to reflect the new profile picture
      } else {
        Alert.alert("Error", "Failed to update profile picture");
      }
    } catch (error) {
      console.log("Error uploading image", error);
      Alert.alert("Error", "An error occurred while uploading the image");
    }
  };

  const handleVerificationRequest = () => {
    console.log(" Hello World ");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.header.container}>
          <Text style={styles.header.headingLabel}>
            The information you provide assists you in gaining more reputation.
            Therefore, provide maximum information:
          </Text>
        </View>
        {/* USERNAME */}
        <View style={styles.fieldContainer}>
          <View style={styles.fieldContainer.left}>
            <Text style={styles.fieldContainer.label}>Username:</Text>
          </View>
          <View style={styles.fieldContainer.right}>
            <CustomFormInputField
              value={username}
              editable={false}
              isIcon={false}
            />
          </View>
        </View>

        {/* EMAIL */}
        <View style={styles.fieldContainer}>
          <View style={styles.fieldContainer.left}>
            <Text style={styles.fieldContainer.label}>Email:</Text>
          </View>
          <View style={styles.fieldContainer.right}>
            <CustomFormInputField
              value={email}
              editable={false}
              isIcon={false}
            />
          </View>
        </View>

        {/* EMAIL */}
        <View style={styles.fieldContainer}>
          <View style={styles.fieldContainer.left}>
            <Text style={styles.fieldContainer.label}>Phone Number:</Text>
          </View>
          <View style={styles.fieldContainer.right}>
            <CustomFormInputField
              value={phoneNo}
              editable={true}
              onChange={setPhoneNo}
              keyboardType="numeric"
              isIcon={false}
            />
          </View>
        </View>

        {/* CNIC */}
        <View style={styles.fieldContainer}>
          <View style={styles.fieldContainer.left}>
            <Text style={styles.fieldContainer.label}>CNIC:</Text>
          </View>
          <View style={styles.fieldContainer.right}>
            <CustomFormInputField
              value={cnic}
              editable={true}
              onChange={setCnic}
              keyboardType="numeric"
              isIcon={false}
            />
          </View>
        </View>

        {/* Province */}
        <View style={styles.fieldContainer}>
          <View style={styles.fieldContainer.left}>
            <Text style={styles.fieldContainer.label}>Province:</Text>
          </View>
          <View style={styles.fieldContainer.right}>
            <CustomFormInputField
              value={province}
              editable={true}
              onChange={setProvince}
              isIcon={false}
            />
          </View>
        </View>

        {/* City */}
        <View style={styles.fieldContainer}>
          <View style={styles.fieldContainer.left}>
            <Text style={styles.fieldContainer.label}>City:</Text>
          </View>
          <View style={styles.fieldContainer.right}>
            <CustomFormInputField
              value={city}
              editable={true}
              onChange={setCity}
              isIcon={false}
            />
          </View>
        </View>

        {/* Button Container */}
        <View style={styles.btnContainer}>
          <View
            style={[
              { height: "50%" },
              displayMoreOptions
                ? styles.displayMoreOptionsEnabled
                : styles.displayMoreOptionsDisabled
            ]}
          >
            <LargeBtnWithIcon
              btnColor={!displayMoreOptions ? Color.white : Color.dark}
              btnLabel={"More Options"}
              btnBorderColor={!displayMoreOptions ? Color.dark : Color.white}
              btnLabelColor={!displayMoreOptions ? Color.dark : Color.white}
              icon={
                !displayMoreOptions ? "arrow-circle-up" : "arrow-circle-down"
              }
              iconColor={!displayMoreOptions ? Color.dark : Color.white}
              onPress={toggleMoreOptions}
            />
            {displayMoreOptions &&
              <View style={styles.optionsBtnInnerContainer}>
                <FlatList
                  data={moreOptions}
                  renderItem={({ item }) =>
                    <LargeBtnWithIcon
                      icon={"chevron-right"}
                      iconColor={Color.dark}
                      btnLabel={item.label}
                      btnLabelColor={Color.dark}
                      iconSize={15}
                      btnBorderColor={Color.dark}
                      onPress={item.function()}
                    />}
                  contentContainerStyle={{
                    gap: 10
                  }}
                />
              </View>}
          </View>

          <LargeBtnWithIcon
            btnColor={Color.dark}
            btnLabel={"Save & Exit"}
            icon={"check-circle"}
            iconColor={Color.white}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: sizeManager(2)
  },
  header: {
    container: {
      width: "100%",
      height: "auto",
      paddingVertical: sizeManager(1)
    },
    headingLabel: {
      fontFamily: FontFamily.ubuntuLight,
      fontSize: sizeManager(2),
      paddingVertical: sizeManager(0.5),
      textAlign: "justify"
    }
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizeManager(1),
    paddingVertical: sizeManager(0.5),
    label: {
      fontFamily: FontFamily.ubuntuLight,
      fontSize: sizeManager(2)
    },
    left: {
      flex: 0.3
    },
    right: {
      flex: 1
    }
  },
  btnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
    gap: sizeManager(2)
  },
  displayMoreOptionsDisabled: {
    justifyContent: "flex-end"
  },
  displayMoreOptionsEnabled: {
    justifyContent: "flex-start",
    borderBottomRightRadius: sizeManager(5),
    borderBottomLeftRadius: sizeManager(5),
    backgroundColor: Color.white,
    elevation: 10
  },
  optionsBtnInnerContainer: {
    paddingVertical: sizeManager(1),
    paddingHorizontal: sizeManager(2)
  }
});

export default ManagePersonalInfo;
