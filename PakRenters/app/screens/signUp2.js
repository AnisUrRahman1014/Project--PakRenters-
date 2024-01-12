import {React, useState} from 'react'
import { useFonts } from "expo-font";
import { Text, View, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from "./ImageViewerCustom";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../../constants/GlobalStyles";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SignUp2(){
    const [selectedImage, setSelectedImage] = useState(null);
    let PlaceholderImage = require("../../assets/images/userDemoPic.png")
    const [fontsLoaded, error] = useFonts({
      "Ubuntu-Bold": require("../../assets/fonts/Ubuntu-Bold.ttf"),
      "Ubuntu-Regular": require("../../assets/fonts/Ubuntu-Regular.ttf")
    });

    if (!fontsLoaded && !error) {
      return null;
    }
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

    return <View style={styles.mainContainer}>
        <View style={styles.shapeContainer}>
          <View style={styles.curve2}>
            <View style={styles.curve1}>
              <View style={styles.ovalShape}>
                <Image source={require("../../assets/images/PakRenters-v3.0.jpg")} style={{ width: wp(30), height: hp(15), borderRadius: wp(200), resizeMode: "contain", position: "relative", top: 190 }} />
                <Text style={styles.title}>
                  Please choose
                </Text>
                <Text style={styles.title}>your profile picture</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.imagePlaceHolder} onPress={pickImageAsync}>
            <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
          </TouchableOpacity>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.btnText}>Save & Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>;

}

const styles = {
  mainContainer: {
    flex: 1,
    width: wp(100),
    height: hp(100),
    alignItems: "center"
  },
  shapeContainer: {
    flex: 1,
    width: wp(200),
    height: hp(100),
    alignItems: "center"
  },
  ovalShape: {
    position: "relative",
    top: hp(-2),
    borderRadius: wp(100),
    backgroundColor: Color.dark,
    width: wp(110),
    height: hp(55),
    alignItems: "center"
  },
  curve1: {
    position: "relative",
    top: hp(-2),
    borderRadius: wp(100),
    backgroundColor: Color.medium,
    width: wp(110),
    height: hp(55),
    alignItems: "center",
    overflow: "hidden"
  },
  curve2: {
    position: "relative",
    top: hp(-15),
    borderRadius: wp(100),
    backgroundColor: Color.focus,
    width: wp(110),
    height: hp(55),
    alignItems: "center",
    overflow: "hidden"
  },
  title: {
    position: "relative",
    textAlign: "center",
    top: hp(25),
    color: Color.white,
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 24,
    width: wp(100)
  },
  infoContainer: {
    flex: 1.4,
    position: "relative",
    width: wp(80),
    height: hp(50),
    margin: hp(2),
  },
  imagePlaceHolder:{
    position: "relative",
    height: hp(40),
    width: wp(80),
    borderRadius: wp(100),
    backgroundColor: Color.lightGrey,
    alignItems:'center',
    resizeMode: 'contain'
  },
  btnContainer: {
    position: "relative",
    height: hp(10),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  button: {
    position: "relative",
    backgroundColor: Color.focus,
    borderRadius: wp(100),
    width: wp(50),
    height: hp(5),
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: {
    color: Color.white,
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 14
  },
  iconContainer: {
    width: wp(7),
    height: hp(3),
    alignItems: "center",
    justifyContent: "center"
  }
};

// How to prompt a user to choose an image from the gallery. React Native code?

