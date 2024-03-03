import { Stack } from "expo-router";
import { React, useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../../../constants/GlobalStyles";
import { CustomFormInputField, Smallbtn } from "../../../components/misc";

const SingUpScreen3 = () => {
  const [cnic, setCnic] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
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
            placeHolder={"CNIC"}
            value={cnic}
            onChange={setCnic}
          />

          <CustomFormInputField
            iconName={"map"}
            placeHolder={"Province"}
            value={province}
            onChange={setProvince}
          />

          <CustomFormInputField
            iconName={"map-marker"}
            placeHolder={"City"}
            value={city}
            onChange={setCity}
          />

          <Text style={styles.infoStatement}>
            Remember, the more info you provide, better reputation you will
            have.
          </Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity>
              <Text>Skip</Text>
            </TouchableOpacity>
            <Smallbtn btnLabel={"Sign Up"} />
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
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(70)
  }
};

export default SingUpScreen3;
