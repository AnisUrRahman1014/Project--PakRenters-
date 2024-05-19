import { View, Text, StyleSheet, SafeAreaView } from "react-native";
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

const managePersonalInfo = () => {
  const { user } = useLocalSearchParams();
  const [username, setUsername] = useState(user.getUsername());
  const [email, setEmail] = useState(user.getEmail());
  const [phoneNo, setPhoneNo] = useState(user.getPhoneNo());
  const [cnic, setCnic] = useState(user.getCNIC());
  const [province, setProvince] = useState(user.getProvince());
  const [city, setCity] = useState(user.getCity());

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
            <CustomFormInputField value={username} editable={false} />
          </View>
        </View>

        {/* EMAIL */}
        <View style={styles.fieldContainer}>
          <View style={styles.fieldContainer.left}>
            <Text style={styles.fieldContainer.label}>Email:</Text>
          </View>
          <View style={styles.fieldContainer.right}>
            <CustomFormInputField value={email} editable={false} />
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
            />
          </View>
        </View>

        {/* Button Container */}
        <View style={styles.btnContainer}>
          <LargeBtnWithIcon
            btnColor={Color.white}
            btnLabel={"More Options"}
            btnBorderColor={Color.dark}
            btnLabelColor={Color.dark}
            icon={"arrow-circle-up"}
            iconColor={Color.dark}
          />

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
    flexDirection: "row",
    position: "relative",
    bottom: -260,
    width: "100%",
    justifyContent: "center",
    alignItems: "stretch",
    gap: sizeManager(2)
  }
});

export default managePersonalInfo;
