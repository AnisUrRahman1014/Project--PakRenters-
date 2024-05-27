import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Color,
  FontFamily,
  sizeManager
} from "../../../constants/GlobalStyles";
import { CustomAdInputField, LargeBtnWithIcon } from "../../../components/misc";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "expo-router";
import User from "../../classes/User";
import Post from "../../classes/Post0";
import { Dropdown } from "react-native-element-dropdown";
import * as Location from "expo-location";
import axios from "axios";

const PostAdScreen1 = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rent, setRent] = useState("");
  const [location, setLocation] = useState({});

  const [cityProvinceString, setCityProvinceString] = useState("");
  const [street, setStreet] = useState("");
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
      const { city, region } = firstAddress;
      const locationObject = { street: "NaN", city: "NaN", region: "NaN" };
      let cityProvinceString = "";
      if (city) {
        cityProvinceString += `${city}, `;
        locationObject.city = city;
      }
      if (region) {
        cityProvinceString += `${region}`;
        locationObject.region = region;
      }
      setCityProvinceString(cityProvinceString);
      setLocation(locationObject);
    } else {
      setCityProvinceString("Address not found");
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

  const validateFields = () => {
    // Check for empty fields
    if (!title.trim()) {
      alert("Post title is required.");
      return false;
    }
    if (!description.trim()) {
      alert("Description is required.");
      return false;
    }
    if (!rent.trim()) {
      alert("Rent is required.");
      return false;
    }
    if (!postCategory) {
      alert("Category is required.");
      return false;
    }
    if (!cityProvinceString.trim()) {
      alert("City and Province are required.");
      return false;
    }

    // Validate Rent
    const rentPattern = /^[0-9]+$/;
    if (!rentPattern.test(rent)) {
      alert("Rent should only contain digits (0-9).");
      return false;
    }

    return true;
  };

  const handleTitleChange = text => {
    if (text.length <= 50) {
      setTitle(text);
    } else {
      Alert.alert("Post title should not exceed 50 characters.");
    }
  };

  const handleDescriptionChange = text => {
    if (text.length <= 500) {
      setDescription(text);
    } else {
      Alert.alert("Description should not exceed 500 characters.");
    }
  };

  let post;
  const handleProceed = () => {
    if (!validateFields()) {
      return;
    }
    reverseGeocode();
    setAddressString(street.concat(", " + cityProvinceString));
    let temp = location;
    temp.street = street;
    setLocation(temp);

    console.log(location);

    post = new Post(user, title, description, postCategory, location, rent);
    console.log(post);
    navigation.navigate("vehicleDetailsScreen", { newPost: post });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.mainContainer}>
        <View style={styles.section}>
          <View style={styles.container}>
            <Text style={styles.label}>Post Title: *</Text>
            <CustomAdInputField
              placeHolder={"e.g. Honda Civic Ek Black"}
              value={title}
              onChange={handleTitleChange}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Description: *</Text>
            <CustomAdInputField
              placeHolder={"e.g. Details of the vehicle"}
              multiline={true}
              value={description}
              onChange={handleDescriptionChange}
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
              maxHeight={150}
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
            <Text style={styles.label}>City, Province: *</Text>
            <CustomAdInputField editable={false} value={cityProvinceString} />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Street, House No. : </Text>
            <CustomAdInputField
              value={street}
              onChange={text => setStreet(text)}
              placeHolder={"e.g. Shehzad Colony"}
            />
          </View>

          {/* Map Container */}
          <View style={styles.container}>
            <Text style={styles.label}>Location: *</Text>
            <MapView
              style={{ width: "100%", height: 200 }}
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              showsMyLocationButton={true}
              followUserLocation={true}
              region={mapRegion}
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
