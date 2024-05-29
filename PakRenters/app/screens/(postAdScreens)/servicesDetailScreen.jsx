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
import { useLocalSearchParams, useNavigation } from "expo-router";
import { LargeBtnWithIcon, ServiceSwitch } from "../../../components/misc";
import { Services } from "../../../constants/Services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { ipAddress } from "../../../constants/misc";
import axios from "axios";

const ServicesDetail = () => {
  const { post } = useLocalSearchParams();
  const navigation = useNavigation();

  const [services, setServices] = useState([
    { label: Services.selfDrive, isEnabled: true },
    { label: Services.withDriver, isEnabled: false },
    { label: Services.decoration, isEnabled: false },
    { label: Services.passengerPnD, isEnabled: false },
    { label: Services.vehiclePnD, isEnabled: false },
    { label: Services.tourism, isEnabled: false }
  ]);

  const toggleService = index => {
    setServices(prevServices =>
      prevServices.map(
        (service, i) =>
          i === index ? { ...service, isEnabled: !service.isEnabled } : service
      )
    );
  };

  const handleProceed = () => {
    post.setServices(services);
    updateDatabase(post);
  };

  const updateDatabase = async post => {
    console.log(post.getServices());
    try {
      const authToken = await AsyncStorage.getItem("authToken");
      if (!authToken) {
        Alert.alert("Failed to post ad", "The user must be logged in");
        return;
      }

      const decodedToken = jwtDecode(authToken);
      const userId = decodedToken.userId;

      const formData = new FormData();

      formData.append("postId", post.id);
      formData.append("title", post.title);
      formData.append("description", post.description);
      formData.append("location", JSON.stringify(post.location));
      formData.append("rentPerDay", post.rent);

      formData.append("services", JSON.stringify(post.getServices()));

      const vehicle = post.vehicle;
      formData.append("make", vehicle.make);
      formData.append("model", vehicle.model);
      formData.append("year", vehicle.year);
      formData.append("transmission", vehicle.transmission);
      formData.append("engine", vehicle.engine);
      formData.append("ac", vehicle.AC);
      formData.append("cruise", vehicle.cruise);
      formData.append("seatingCapacity", vehicle.seats);
      formData.append("abs", vehicle.absBrakes);
      vehicle.images.forEach((image, index) => {
        formData.append("images", {
          uri: image,
          name: image.split("/").pop(),
          type: "image/jpeg" // or the correct mime type
        });
      });

      const response = await axios.post(
        `http://${ipAddress}:8000/post/createPostWithVehicle/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`
          }
        }
      );

      if (response.status === 201) {
        Alert.alert("Success", "Your post has been successfully created!");
        navigation.navigate("index");
      } else {
        Alert.alert(
          "Failed to post ad",
          "An error occurred while creating your post."
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Failed to post ad", `An error occurred: ${error.message}`);
    }
  };

  const fetchVehicleId = async vehicle => {
    try {
      const response = await axios.get(
        `http://${ipAddress}:8000/vehicles/${vehicle.postId}`
      );
      if (response.status === 200) {
        return response.data.vehicleId; // Make sure to access response.data.vehicleId
      }
    } catch (error) {
      Alert.alert("Error", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Please choose the services you would provide with your vehicle:{" "}
          </Text>
        </View>

        <View style={styles.section}>
          <FlatList
            data={services}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) =>
              <ServiceSwitch
                serviceLabel={item.label}
                isEnabled={item.isEnabled}
                onToggle={() => toggleService(index)}
              />}
          />
        </View>

        <View
          style={[
            styles.container,
            {
              justifyContent: "center",
              alignItems: "center",
              marginTop: sizeManager(2)
            }
          ]}
        >
          <LargeBtnWithIcon
            btnLabel={"Post Ad"}
            btnColor={Color.focus}
            icon={"check-circle"}
            iconColor={Color.white}
            onPress={() => {
              handleProceed();
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
    paddingHorizontal: sizeManager(2)
  },
  headerContainer: {
    width: "100%",
    height: "auto",
    paddingVertical: sizeManager(2)
  },
  headerText: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: sizeManager(2.2),
    textAlign: "center"
  }
});

export default ServicesDetail;
