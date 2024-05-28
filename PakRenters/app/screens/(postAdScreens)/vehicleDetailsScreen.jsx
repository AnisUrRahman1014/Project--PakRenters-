import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
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
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Vehicle from "../../classes/Vehicle0";

const VehicleDetailsScreen = () => {
  const navigation = useNavigation();

  const { newPost } = useLocalSearchParams();

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [engine, setEngine] = useState("");
  const [transmission, setTransmission] = useState("");
  const [abs, setAbs] = useState(false);
  const [ac, setAC] = useState(false);
  const [seats, setSeats] = useState("");
  const [cruise, setCruise] = useState(false);

  const pickImage = async () => {
    if (images.length >= 8) {
      Alert.alert("Limit Reached", "You can only upload up to 8 images.");
      return;
    }

    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Allow multiple selection in the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // This is available only on web currently
      aspect: [4, 3],
      selectionLimit: 8 - images.length // Limit based on remaining slots
    });

    if (!result.canceled && result.assets) {
      setImages(prevImages => [...prevImages, ...result.assets]); // Correctly merge previous images with new ones
    }
  };

  const takePhoto = async () => {
    if (images.length >= 8) {
      Alert.alert("Limit Reached", "You can only upload up to 8 images.");
      return;
    }

    // Ask for camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    if (!result.canceled) {
      setImages(prevImages => [...prevImages, ...result.assets]); // Correctly merge previous images with new ones
    }
  };

  const handleImagePress = uri => {
    if (selectedImage !== "" && selectedImage === uri) {
      const newImages = images.filter(image => image.uri !== uri);
      setImages(newImages);
    } else {
      setSelectedImage(uri);
    }
  };

  // Function to render each item
  const renderItem = ({ item }) => {
    const isPortrait = item.width > item.height;
    const isSelected = selectedImage === item.uri;

    return (
      <TouchableOpacity
        style={styles.imageUploadContainer}
        onPress={() => handleImagePress(item.uri)}
      >
        <Image
          source={{ uri: item.uri }}
          style={{
            width: "100%",
            aspectRatio: !isPortrait ? 3 / 4 : 4 / 3,
            resizeMode: "contain",
            borderRadius: !isPortrait ? sizeManager(2) : 0
          }}
        />
        {/* Overlay */}
        {isSelected &&
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: Color.dark,
              borderRadius: sizeManager(2),
              opacity: 0.8,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon name="trash" size={40} color={Color.white} />
          </View>}
      </TouchableOpacity>
    );
  };

  // Render Footer to show the add button if less than 8 images
  const renderFooter = () =>
    images.length < 8 &&
    <TouchableOpacity
      style={styles.imageUploadContainer}
      onPress={handleImageChooseRequest}
    >
      <Icon name="plus" size={50} color="grey" />
    </TouchableOpacity>;

  const handleImageChooseRequest = () => {
    Alert.alert(
      "Choose Image Source",
      "Select an option to choose an image source",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Gallery",
          onPress: () => pickImage()
        },
        {
          text: "Take Photo",
          onPress: () => takePhoto()
        }
      ],
      { cancelable: true }
    );
  };

  const validateFields = () => {
    if (!make) {
      Alert.alert("Validation Error", "Please enter the make of the vehicle.");
      return false;
    }
    if (!model) {
      Alert.alert("Validation Error", "Please enter the model of the vehicle.");
      return false;
    }
    if (!year || isNaN(year)) {
      Alert.alert("Validation Error", "Please enter a valid year.");
      return false;
    }
    if (!engine) {
      Alert.alert("Validation Error", "Please select the engine type.");
      return false;
    }
    if (!transmission) {
      Alert.alert("Validation Error", "Please select the transmission type.");
      return false;
    }
    if (!seats || isNaN(seats)) {
      Alert.alert("Validation Error", "Please select the number of seats.");
      return false;
    }
    if (images.length === 0) {
      Alert.alert("Validation Error", "Please upload at least one image.");
      return false;
    }
    return true;
  };

  let vehicle;
  const handleProceed = () => {
    if (!validateFields()) {
      return;
    }

    vehicle = new Vehicle(
      newPost.id,
      make,
      model,
      year,
      engine,
      seats,
      transmission,
      ac,
      abs,
      cruise
    );
    // Extract URIs from images
    const imageUris = images.map(image => image.uri);
    vehicle.setImages(imageUris);
    console.log(vehicle.images);

    newPost.setVehicle(vehicle);
    navigation.navigate("servicesDetailScreen", {
      post: newPost
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.imageContainer}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={item => item.uri}
          ListFooterComponent={renderFooter}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center"
          }}
          horizontal
        />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.label}>Make *</Text>
          <CustomAdInputField
            placeHolder={"e.g., Toyota"}
            onChange={text => setMake(text)}
            value={make}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Model & Variant *</Text>
          <CustomAdInputField
            placeHolder={"e.g., Corolla 1.6X"}
            onChange={text => setModel(text)}
            value={model}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Year *</Text>
          <CustomAdInputField
            placeHolder={"e.g., 2007"}
            onChange={text => setYear(text)}
            keyboardType="numeric"
            value={year}
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
                { label: "Yes", value: true },
                { label: "No", value: false }
              ]}
              setValue={setAC}
            />
            <SpecsDisplayInput
              iconName={"car-seat"}
              options={[
                { label: "2", value: 2 },
                { label: "4", value: 4 },
                { label: "5", value: 5 },
                { label: "7", value: 7 },
                { label: "11", value: 11 }
              ]}
              setValue={setSeats}
            />
            <SpecsDisplayInput
              iconName={"car-brake-abs"}
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false }
              ]}
              setValue={setAbs}
            />
            <SpecsDisplayInput
              iconName={"car-cruise-control"}
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false }
              ]}
              setValue={setCruise}
            />
          </View>
        </View>
        <View
          style={[
            styles.container,
            {
              justifyContent: "center",
              alignItems: "space-between",
              marginTop: sizeManager(3)
            }
          ]}
        >
          <LargeBtnWithIcon
            btnLabel={"Proceed"}
            btnColor={Color.dark}
            icon={"arrow-circle-right"}
            iconColor={Color.white}
            onPress={handleProceed}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: Color.white
  },
  imageUploadContainer: {
    width: sizeManager(20),
    aspectRatio: 3 / 4,
    margin: sizeManager(2),
    borderRadius: sizeManager(2),
    backgroundColor: Color.lightGrey,
    alignItems: "center",
    justifyContent: "center"
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Color.focus,
    opacity: 60,
    borderRadius: sizeManager(2)
  },
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
