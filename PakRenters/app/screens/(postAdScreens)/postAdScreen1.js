import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Color,
  FontFamily,
  sizeManager
} from "../../../constants/GlobalStyles";
import { CustomAdInputField, LargeBtnWithIcon } from "../../../components/misc";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { router } from "expo-router";
import User from "../../classes/User";
import Post from "../../classes/Post0";
import { Dropdown } from "react-native-element-dropdown";
import * as Location from "expo-location";
const PostAdScreen1 = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rent, setRent] = useState("");
  const [location, setLocation] = useState({});

  const [addressString, setAddressString] = useState("");

  const [isFocus, setIsFocus] = useState(false);
  const [postCategory, setPostCategory] = useState("");

  const [mapRegion, setMapRegion] = useState({
    latitude: 30.3753,
    longitude: 69.3451,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  });

  const user = new User(
    "i_a_n_33_s",
    "anisrahman1014@gmail.com",
    "ab26856de8",
    "03304089490"
  );

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let currentLocation = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    setLocation(currentLocation);
    setMapRegion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    });
  };

  const reverseGeocode = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });
    const address = await Location.reverseGeocodeAsync({
      longitude: currentLocation.coords.longitude,
      latitude: currentLocation.coords.latitude
    });
    if (address.length > 0) {
      const firstAddress = address[0]; // Assuming you want to use the first address
      const { name, city, region } = firstAddress;

      let addressString = "";
      if (name) {
        addressString += `${name}, `;
      }
      if (city) {
        addressString += `${city}, `;
      }
      if (region) {
        addressString += `${region}`;
      }
      setAddressString(addressString);
    } else {
      setAddressString("Address not found");
    }
  };

  useEffect(() => {
    userLocation();
  }, []);

  useEffect(
    () => {
      if (location) {
        reverseGeocode();
      }
    },
    [location]
  );
  let post;
  const handleProceed = () => {
    reverseGeocode();
    post = new Post(user, title, description, postCategory, location, rent);
    console.log(post);
    router.push("./postAdScreen2");
    router.setParams({ newPost: post });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.section}>
          <View style={styles.container}>
            <Text style={styles.label}>Title: *</Text>
            <CustomAdInputField
              placeHolder={"Enter your title here"}
              onChange={text => setTitle(text)}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Description: *</Text>
            <CustomAdInputField
              placeHolder={"Enter post description here"}
              multiline={true}
              onChange={text => setDescription(text)}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Rent: *</Text>
            <CustomAdInputField
              placeHolder={"Enter Rent-Per-Day"}
              keyboardType="numeric"
              onChange={text => setRent(text)}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Category: *</Text>
            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.selectedTextStyle}
              data={[
                { label: "Car", value: "car" },
                { label: "Truck", value: "truck" },
                { label: "Bus", value: "bus" },
                { label: "Bike", value: "motorbike" },
                { label: "Loader", value: "truck-flatbed" },
                { label: "Construction Vehicle", value: "excavator" }
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select" : "..."}
              value={postCategory}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setPostCategory(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Address: *</Text>
            <CustomAdInputField
              placeHolder={"Click the small icon on maps to fetch address"}
              editable={false}
              value={addressString}
            />
          </View>
          {/* Map Container */}
          <View style={styles.container}>
            <Text style={styles.label}>Location: *</Text>
            <MapView
              style={{ width: 370, height: 200 }}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              showsMyLocationButton={true}
              followUserLocation={true}
            >
              <Marker coordinate={mapRegion} />
            </MapView>
          </View>

          {/* Next Button Container */}
          <View
            style={[
              styles.container,
              { justifyContent: "center", alignItems: "flex-end" }
            ]}
          >
            <LargeBtnWithIcon
              btnLabel={"Vehicle Details"}
              btnColor={Color.dark}
              icon={"arrow-circle-right"}
              iconColor={Color.white}
              onPress={() => {
                handleProceed();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white
  },
  section: {
    display: "flex",
    flex: 5,
    paddingHorizontal: sizeManager(1)
  },
  label: {
    fontFamily: FontFamily.ubuntuMedium,
    fontSize: sizeManager(2.1),
    color: Color.dark
  },
  container: {
    marginVertical: sizeManager(0.5)
  },
  dropdown: {
    width: sizeManager(47),
    fontFamily: FontFamily.ubuntuLight,
    borderWidth: sizeManager(0.1),
    paddingHorizontal: sizeManager(1)
  },
  dropdownPlaceholder: {
    fontFamily: FontFamily.ubuntuRegular
  }
});

export default PostAdScreen1;
