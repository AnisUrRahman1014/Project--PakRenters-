import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image
} from "react-native";
import React, { useState } from "react";
import {
  Color,
  FontFamily,
  sizeManager
} from "../../../constants/GlobalStyles";
import { CustomAdInputField } from "../../../components/misc";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Icon from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";

const PostAdScreen1 = () => {
  const [images, setImages] = useState([]);

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

  const data = [
    { id: "1", text: "Item 1" },
    { id: "2", text: "Item 2" },
    { id: "3", text: "Item 3" }
    // Add more items as needed
  ];

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
      <ScrollView style={styles.mainContainer}>
        <View style={styles.section}>
          <View style={styles.container}>
            <Text style={styles.label}>Title: *</Text>
            <CustomAdInputField placeHolder={"Enter your title here"} />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Description: *</Text>
            <CustomAdInputField
              placeHolder={"Enter post description here"}
              multiline={true}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Rent: *</Text>
            <CustomAdInputField
              placeHolder={"Enter Rent-Per-Day"}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Location: *</Text>
            <MapView
              style={{ width: 370, height: 200 }}
              provider={PROVIDER_GOOGLE}
              showsUserLocation
              showsMyLocationButton
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
  }
});

export default PostAdScreen1;
