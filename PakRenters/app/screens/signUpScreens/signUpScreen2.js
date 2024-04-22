import { Stack, router, useLocalSearchParams } from "expo-router";
import { React, useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../../../constants/GlobalStyles";
import ImageViewer from "../../../components/ImageViewerCustom";
import * as ImagePicker from "expo-image-picker";
import { LargeBtn, TextOnlyBtn } from "../../../components/misc";

const SignUpScreen2 = () => {
  const { newUser } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState(null);
  let PlaceholderImage = require("../../../assets/images/userDemoPic.png");

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });
    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const handleContinue = () => {
    newUser.setProfilePic(selectedImage);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: "Step 2 / 3",
          headerShadowVisible: false,
          headerTintColor: Color.dark,
          headerTransparent: false,
          headerTitleAlign: "center"
        }}
      />
      <View style={styles.mainContainer}>
        <View style={styles.tagLineContainer}>
          <Text style={styles.tagLine}>Please choose a profile picture</Text>
        </View>

        <View style={styles.infoContainer}>
          <TouchableOpacity
            style={styles.imagePlaceHolder}
            onPress={pickImageAsync}
          >
            <ImageViewer
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
          </TouchableOpacity>
          <View style={styles.btnContainer}>
            <LargeBtn
              btnLabel={"Proceed"}
              btnColor={Color.dark}
              onPress={() => {
                handleContinue();
                router.push("../../screens/signUpScreens/signUpScreen3");
                router.setParams({ newUser });
              }}
            />
            <Text>You can also proceed without an image</Text>
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
  infoContainer: {
    flex: 4,
    position: "relative",
    width: wp(80),
    height: hp(50),
    margin: hp(2)
  },
  imagePlaceHolder: {
    position: "relative",
    height: hp(40),
    width: wp(80),
    borderRadius: wp(100),
    backgroundColor: Color.lightGrey,
    alignItems: "center",
    resizeMode: "contain"
  },
  btnContainer: {
    position: "relative",
    height: hp(10),
    alignItems: "center",
    justifyContent: "center",
    gap: 5
  }
};

export default SignUpScreen2;
