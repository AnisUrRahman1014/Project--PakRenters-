import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity
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
import Icon from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";

const VehicleDetailsScreen = () => {
  const { newPost } = useLocalSearchParams();
  const [images, setImages] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [variant, setVariant] = useState("");
  const [engine, setEngine] = useState("");
  const [transmission, setTransmission] = useState("");
  const [abs, setAbs] = useState("");
  const [AC, setAC] = useState("");
  const [seats, setSeats] = useState("");
  const [cruise, setCruise] = useState("");

  console.log(newPost);

  const pickImage = async () => {
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
      quality: 1
    });

    if (!result.canceled && result.assets) {
      setImages(prevImages => [...prevImages, ...result.assets]); // Correctly merge previous images with new ones
    }
  };

  const takePhoto = async () => {
    // Ask for camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };
  // Function to render each item
  const renderItem = ({ item }) =>
    <View style={styles.imageUploadContainer}>
      <Image
        source={{ uri: item.uri }}
        style={{
          width: "100%",
          aspectRatio: 3 / 4,
          resizeMode: "contain",
          borderRadius: sizeManager(2)
        }}
      />
    </View>;

  // Render Footer to show the add button
  const renderFooter = () =>
    <TouchableOpacity style={styles.imageUploadContainer} onPress={pickImage}>
      <Icon name="plus" size={50} color="grey" />
    </TouchableOpacity>;

  const postAd = () => {};

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
