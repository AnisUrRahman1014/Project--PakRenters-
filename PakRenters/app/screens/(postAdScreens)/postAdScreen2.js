import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import {
  Color,
  FontFamily,
  sizeManager
} from "../../../constants/GlobalStyles";
import {
  CustomAdInputField,
  LargeBtnWithIcon,
  SpecsDisplayInput
} from "../../../components/misc";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const VehicleDetailsScreen = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [engine, setEngine] = useState("");
  const [transmission, setTransmission] = useState("");
  const [abs, setAbs] = useState("");
  const [AC, setAC] = useState("");
  const [seats, setSeats] = useState("");
  const [cruise, setCruise] = useState("");

  const postAd = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.label}>Make *</Text>
          <CustomAdInputField
            placeHolder={"e.g., Toyota"}
            onChange={text => setMake(text)}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Variant *</Text>
          <CustomAdInputField
            placeHolder={"e.g., Corolla"}
            onChange={text => setVariant(text)}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Model *</Text>
          <CustomAdInputField
            placeHolder={"e.g., 2007"}
            onChange={text => setModel(text)}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Specification *</Text>
          <View style={styles.detailsSubContainer}>
            <SpecsDisplayInput
              iconName={"engine"}
              options={[
                { label: "660", value: "660" },
                { label: "800", value: "800" },
                { label: "1000", value: "1000" },
                { label: "1.2", value: "1.2" },
                { label: "1.3", value: "1.3" },
                { label: "1.5", value: "1.5" },
                { label: "1.6", value: "1.6" },
                { label: "1.8", value: "1.8" },
                { label: "2.0", value: "2.0" },
                { label: "2.4", value: "2.4" }
              ]}
              setValue={setEngine}
            />
            <SpecsDisplayInput
              iconName={"car-shift-pattern"}
              options={[
                { label: "Automatic", value: "Automatic" },
                { label: "Manual", value: "Manual" }
              ]}
              setValue={setTransmission}
            />
            <SpecsDisplayInput
              iconName={"car-seat-cooler"}
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" }
              ]}
              setValue={setAC}
            />
            <SpecsDisplayInput
              iconName={"car-seat"}
              options={[
                { label: "2", value: "2" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
                { label: "7", value: "7" },
                { label: "11", value: "11" }
              ]}
              setValue={setSeats}
            />
            <SpecsDisplayInput
              iconName={"car-brake-abs"}
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" }
              ]}
              setValue={setAbs}
            />
            <SpecsDisplayInput
              iconName={"car-cruise-control"}
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "0" }
              ]}
              setValue={setCruise}
            />
          </View>
        </View>
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center" }
          ]}
        >
          <LargeBtnWithIcon
            btnLabel={"Post Ad"}
            btnColor={Color.focus}
            icon={"check-circle"}
            iconColor={Color.white}
            onPress={() => {
              postAd;
            }}
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
    padding: sizeManager(2)
  },
  label: {
    fontFamily: FontFamily.ubuntuMedium,
    fontSize: sizeManager(2.1),
    color: Color.dark
  },
  container: {
    marginVertical: sizeManager(0.5)
  },
  detailsSubContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default VehicleDetailsScreen;
