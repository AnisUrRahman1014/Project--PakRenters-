import { Stack, router } from "expo-router";
import { React, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../constants/GlobalStyles";
import HeaderBtn from "../components/headerBtn";
import SearchBar from "../components/searchBar";
import CategoryBtn from "../components/categoryBtn";
import VehicleCard from "../components/vehicleCard0";
import Vehicle from "./classes/Vehicle";

const categories = [
  "car",
  "motorbike",
  "bus",
  "truck-flatbed",
  "truck",
  "excavator"
];

const vehicles = [
  new Vehicle(
    1,
    "Honda Civic EK",
    "Islamabad,Punjab",
    3500,
    250,
    4.9,
    require("../assets/images/civic003.jpg")
  ),
  new Vehicle(
    2, // Assuming '1' as an ID for this example
    "Toyota Prado", // vehicleName
    "Gujrat, Punjab", // location
    "5000", // rent
    "43", // comments
    "1.0", // rating
    require("../assets/images/toyota-prado-1.jpg") // image
  ),
  new Vehicle(
    1,
    "Honda Civic EK",
    "Islamabad,Punjab",
    3500,
    250,
    4.9,
    require("../assets/images/civic003.jpg")
  )
];

const Home = () => {
  const openMenu = () => {};
  const manageAccount = () => {
    router.push("./screens/loginV2");
  };
  // Dummy Data
  const isLoading = false;
  const error = false;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerLeft: () =>
            <HeaderBtn
              iconName={"bars"}
              onPress={openMenu}
              iconSize={30}
              iconColor={Color.dark}
            />,
          headerRight: () =>
            //   WILL REPLACE THIS WITH LOGO LATER
            <HeaderBtn
              iconName={"user"}
              onPress={manageAccount}
              iconSize={30}
              iconColor={Color.dark}
            />
        }}
      />

      <ScrollView style={styles.mainContainer}>
        <View style={styles.tagLineContainer}>
          <Text style={styles.heading1}>Welcome to PakRenters</Text>
          <Text style={styles.heading2}>Your ultimate renting companion</Text>
        </View>

        <View style={styles.searchBarContainer}>
          <SearchBar />
        </View>
        {/* CATEGORY LABEL */}
        <View style={styles.sectionLabelContainer}>
          <Text style={styles.sectionLabel}>Categories</Text>
        </View>
        {/* CATEGORY CONTAINER */}
        <View style={styles.section}>
          <FlatList
            data={categories}
            renderItem={({ item }) => <CategoryBtn iconName={item} />}
            numColumns={3}
            contentContainerStyle={{
              alignContent: "center",
              justifyContent: "center"
            }}
          />
        </View>
        {/* FEATURED LABEL */}
        <View style={styles.sectionLabelContainer}>
          <Text style={styles.sectionLabel}>Featured</Text>
        </View>
        {/* FEATURED CONTAINER */}
        <View style={[styles.section, { justifyContent: "center" }]}>
          {isLoading
            ? <ActivityIndicator size={"large"} color={Color.dark} />
            : error
              ? <Text>Something went wrong</Text>
              : <FlatList
                  data={vehicles}
                  renderItem={({ item }) =>
                    <VehicleCard
                      cardLabel={item.vehicleName}
                      comments={item.comments}
                      rating={item.rating}
                      location={item.location}
                      rent={item.rent}
                      image={item.image}
                    />}
                  numColumns={2}
                  keyExtractor={item => item.id}
                  contentContainerStyle={{
                    alignItems: "center"
                  }}
                />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    padding: wp(3)
  },
  tagLineContainer: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center"
  },
  heading1: {
    fontFamily: FontFamily.ubuntuBold,
    fontSize: hp(3),
    color: Color.dark
  },
  heading2: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(2),
    color: Color.focus
  },
  searchBarContainer: {
    flex: 0.1,
    marginVertical: hp(2),
    alignItems: "center",
    justifyContent: "center"
  },
  sectionLabelContainer: {
    flex: 0.05,
    width: "100%",
    marginVertical: wp(1)
  },
  sectionLabel: {
    fontFamily: FontFamily.ubuntuBold,
    fontSize: hp(2.5),
    color: Color.dark
  },
  section: {
    flex: 0.3,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: wp(2),
    alignItems: "top"
  }
};

export default Home;
