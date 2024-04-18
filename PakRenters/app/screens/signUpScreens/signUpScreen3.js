import { Stack, router, useLocalSearchParams } from "expo-router";
import { React, useState } from "react";
import { Text, View, SafeAreaView, Alert } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../../../constants/GlobalStyles";
import { CustomFormInputField, Smallbtn } from "../../../components/misc";
import axios from "axios";

const SingUpScreen3 = () => {
  const { newUser } = useLocalSearchParams();
  const [cnic, setCnic] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");

  const validateFields = () => {
    if (cnic !== "" && cnic.length != 13) {
      Alert.alert(
        "Invalid CNIC",
        'Please make sure you entered the correct CNIC. Do not include "-"'
      );
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (!validateFields()) {
      return null;
    }

    newUser.setCNIC(cnic);
    newUser.setProvince(province);
    newUser.setCity(city);

    console.log(newUser);

    const userData = {
      username: newUser.getUsername(),
      email: newUser.getEmail(),
      password: newUser.getPassword(),
      phoneNumber: newUser.getPhoneNo(),
      cnic: newUser.getCNIC(),
      province: newUser.getProvince(),
      city: newUser.getCity(),
      profilePic: newUser.getProfilePic()
    };

    axios
      .post("http://192.168.1.21:8000/register", userData)
      .then(res => {
        Alert.alert(
          "Registration Successful",
          "You have been registered successfully"
        );
        console.log(res.data);
      })
      .catch(error => {
        Alert.alert(
          "Registration failed",
          "An error occured during registration"
        );
        console.log("Registration failed", error);
      });

    router.push("../../(tabs)/(profile)/profileDashboard");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: "Step 3 / 3",
          headerShadowVisible: false,
          headerTransparent: false,
          headerTitleAlign: "center",
          headerTintColor: Color.dark
        }}
      />
      <View style={styles.mainContainer}>
        <View style={styles.tagLineContainer}>
          <Text style={styles.tagLine}>Just one last step...</Text>
        </View>
        <View style={styles.componentContainer}>
          <CustomFormInputField
            iconName={"id-card"}
            placeHolder={"CNIC (Optional)"}
            value={cnic}
            onChange={setCnic}
          />

          <CustomFormInputField
            iconName={"map"}
            placeHolder={"Province (Optional)"}
            value={province}
            onChange={setProvince}
          />

          <CustomFormInputField
            iconName={"map-marker"}
            placeHolder={"City (Optional)"}
            value={city}
            onChange={setCity}
          />

          <Text style={styles.infoStatement}>
            Remember, the more info you provide, better reputation you will
            have.
          </Text>
          <View style={styles.btnContainer}>
            <Smallbtn
              btnLabel={"Sign Up"}
              onPress={() => {
                handleSignUp();
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  mainContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: wp(2),
    backgroundColor: Color.white,
    maxWidth: "100%"
  },
  tagLineContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  tagLine: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(4),
    color: Color.dark,
    textAlign: "center"
  },
  componentContainer: {
    flex: 5,
    paddingHorizontal: wp(2),
    paddingVertical: hp(3),
    gap: hp(3),
    alignItems: "center"
  },
  infoStatement: {
    position: "relative",
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: wp(4.2),
    width: wp(73.5),
    alignItems: "center"
  },
  btnContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: wp(70)
  }
};

export default SingUpScreen3;
