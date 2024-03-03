import { Stack, router } from "expo-router";
import { React, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from "../constants/GlobalStyles";
import HeaderBtn from "../components/headerBtn";
import SearchBar from "../components/searchBar";
import CategoryBtn from "../components/categoryBtn";
import VehicleCard from "../components/vehicleCard0";
const Home = () => {
  const openMenu = () => {};
  const manageAccount = () => {
    router.push("./screens/loginV2");
  };
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
          <CategoryBtn iconName={"car"} />
          <CategoryBtn iconName={"motorbike"} />
          <CategoryBtn iconName={"bus"} />
          <CategoryBtn iconName={"truck-flatbed"} />
          <CategoryBtn iconName={"truck"} />
          <CategoryBtn iconName={"excavator"} />
        </View>
        {/* FEATURED LABEL */}
        <View style={styles.sectionLabelContainer}>
          <Text style={styles.sectionLabel}>Featured</Text>
        </View>
        {/* FEATURED CONTAINER */}
        <View style={[styles.section, { justifyContent: "center" }]}>
          <VehicleCard
            cardLabel="Honda Civic EK"
            comments="168"
            rating="10.0"
            location="Islamabad, Punjab"
            rent="3500"
            image={require("../assets/images/civic003.jpg")}
          />
          <VehicleCard
            cardLabel="Toyota Prado"
            comments="43"
            rating="1.0"
            location="Gujrat, Punjab"
            rent="5000"
            image={require("../assets/images/toyota-prado-1.jpg")}
          />
          <VehicleCard
            cardLabel="Toyota Prado"
            comments="43"
            rating="1.0"
            location="Gujrat, Punjab"
            rent="5000"
            image={require("../assets/images/toyota-prado-1.jpg")}
          />
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
