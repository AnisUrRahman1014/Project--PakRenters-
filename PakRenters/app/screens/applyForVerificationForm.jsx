import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  Color,
  FontFamily,
  StatusColors,
  sizeManager
} from "../../constants/GlobalStyles";
import { CustomFormInputField, LargeBtnWithIcon } from "../../components/misc";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import { ipAddress } from "../../constants/misc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

const ApplyForVerificationForm = () => {
  const { user } = useLocalSearchParams();
  const navigation = useNavigation();
  const [idCardNumber, setIdCardNumber] = useState(user.getCNIC());
  const [idCardFile, setIdCardFile] = useState(null);
  const [whatsAppNumber, setWhatsAppNumber] = useState(user.getPhoneNo());
  const [token, setToken] = useState(null);

  const validateFields = () => {
    if (!idCardNumber || !whatsAppNumber) {
      Alert.alert("Error", "All fields are required.");
      return false;
    }

    const cnicRegex = /^[0-9]{13}$/;
    if (!cnicRegex.test(idCardNumber)) {
      Alert.alert(
        "Error",
        "CNIC must be exactly 13 digits long and contain only numbers."
      );
      return false;
    }

    const phoneRegex = /^((\+92|0)3\d{9})$/;
    if (!phoneRegex.test(whatsAppNumber)) {
      Alert.alert(
        "Error",
        "WhatsApp number must be valid. If starting with '0', it should be 11 digits long. If starting with '+92', it should be 13 digits long."
      );
      return false;
    }

    return true;
  };

  const handleUploadFile = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true
      });

      if (!result.canceled) {
        const token = await AsyncStorage.getItem("authToken");
        setToken(token);
        if (!token) {
          Alert.alert(
            "Unauthorized",
            "Please log in to update your profile picture"
          );
          return;
        }
        setIdCardFile(result);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while uploading the file.");
    }
  };

  const handleSave = async () => {
    if (!validateFields()) {
      return;
    }
    if (idCardFile === null) {
      Alert.alert(
        "CNIC PDF Required",
        "Cannot request without a CNIC pdf file"
      );
      return;
    }
    console.log(idCardFile);
    let uri = idCardFile.assets[0].uri;

    const fileName = uri.split("/").pop();
    const fileType = fileName.split(".").pop();
    let formData = new FormData();
    formData.append("userId", user._id);
    formData.append("whatsappNumber", whatsAppNumber);
    formData.append("cnicNumber", idCardNumber);
    formData.append("idCardFile", {
      name: fileName,
      uri,
      type: `application/${fileType}`
    });
    // try {
    //   const response = await axios.post(
    //     `http://${ipAddress}:8000/uploadCNIC/${user._id}`,
    //     formData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         "Content-Type": "multipart/form-data"
    //       }
    //     }
    //   );

    //   if (response.status === 200) {
    //     Alert.alert("CNIC file stored");
    //     // navigation.goBack();
    //   } else {
    //     Alert.alert("Error", "Failed to upload file.");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   Alert.alert("Request failed", "Please try later");
    // }
    try {
      // Uploading in verificatoin request schema
      const response = await axios.post(
        `http://${ipAddress}:8000/user/uploadVerificationRequest`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status === 200) {
        Alert.alert(
          "Request posted",
          "Your request for validation has been posted. You will soon be contacted by PakRenters"
        );
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to upload file.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Request failed", "Please try later");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Text style={styles.description}>
          Please provide the following information and upload the required
          files.{"\n\n"}PakRenter's Support Assistant will contact you on your
          WhatsApp to verify the details on video call.
        </Text>
        <View style={styles.formContainer}>
          <CustomFormInputField
            placeHolder={"Enter your CNIC"}
            iconName={"id-card"}
            keyboardType="numeric"
            value={idCardNumber}
            onChange={setIdCardNumber}
          />
          <CustomFormInputField
            placeHolder={"Enter your WhatsApp number"}
            iconName={"whatsapp"}
            keyboardType="numeric"
            value={whatsAppNumber}
            onChange={setWhatsAppNumber}
          />
          <Text style={{ paddingVertical: sizeManager(1) }}>
            Upload a pdf file that contains the front and back image of your
            National Id Card. i.e., CNIC
          </Text>
          <View style={styles.btnContainer}>
            {idCardFile &&
              <Icon
                name="check-circle-o"
                size={25}
                color={StatusColors.available}
              />}
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={handleUploadFile}
            >
              <Text style={{ fontFamily: FontFamily.ubuntuLight }}>
                Upload pdf file
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.requestBtnContainer}>
        <LargeBtnWithIcon
          icon={"check-circle"}
          iconColor={Color.white}
          btnColor={Color.focus}
          btnLabel={"Request"}
          btnLabelColor={Color.white}
          onPress={handleSave}
        />
      </View>
    </SafeAreaView>
  );
};

export default ApplyForVerificationForm;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    padding: sizeManager(2)
  },
  description: {
    fontFamily: FontFamily.ubuntuLight,
    fontSize: 16,
    textAlign: "justify"
  },
  formContainer: {
    paddingVertical: sizeManager(2),
    gap: 5
  },
  btnContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: 10
  },
  uploadBtn: {
    paddingVertical: sizeManager(1),
    paddingHorizontal: sizeManager(2),
    backgroundColor: Color.lightGrey,
    justifyContent: "center",
    alignItems: "center"
  },
  requestBtnContainer: {
    backgroundColor: Color.white,
    paddingVertical: sizeManager(5),
    paddingHorizontal: sizeManager(14)
  }
});
