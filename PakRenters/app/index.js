import { Stack, useRouter } from "expo-router";
import { React, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native";
import { Color, FontFamily } from "../constants/GlobalStyles";
import HeaderBtn from "../components/headerBtn";
import icons from "../constants/icons";
import VehicleCard from "../components/vehicleCard";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { useFonts } from "expo-font";
import SearchBar from "../components/searchBar";

const Home = () => {
  const router = useRouter();
  const [fontsLoaded, error] = useFonts({
    "Ubuntu-Bold": require("../assets/fonts/Ubuntu-Bold.ttf"),
    "Ubuntu-Regular": require("../assets/fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-Light": require("../assets/fonts/Ubuntu-Light.ttf"),
    "BreeSerif-Regular": require("../assets/fonts/BreeSerif-Regular.ttf")
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  const openMenu = () => {};

  const openLoginPage = () => {
    router.push("./screens/loginV2");
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerLeftStyle: { color: Color.white },
          headerTitleStyle: { color: Color.white },
          headerStyle: {
            backgroundColor: Color.dark,
            headerTintColor: Color.white
          },
          headerLeft: () => <HeaderBtn iconName={"bars"} onPress={openMenu} />,
          headerRight: () =>
            <HeaderBtn iconName={"user"} onPress={openLoginPage} />
        }}
      />
      {/* HEADER PORTION */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Explore, Get & Drive</Text>
        <Image
          source={require("../assets/images/PakRenters-v3.0.png")}
          style={styles.logoContainer}
        />
      </View>

      {/* SEARCH BAR */}
      <SearchBar />
      {/* FILTER BUTTON */}
      <View style={styles.filterBtnContainer}>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filter}>Filters</Text>
        </TouchableOpacity>
      </View>
      {/* Category Container */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity>
          <Text style={styles.category}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.category}>Available</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.category}>Favorite</Text>
        </TouchableOpacity>
      </View>
      {/* VEHICLE CARD CONTAINER */}
      <ScrollView style={styles.vehicleCardsContainer}>
        <VehicleCard
          cardLabel="Toyota Prado"
          comments="43"
          rating="1.0"
          location="Gujrat, Punjab"
          rent="5000"
          image={require("../assets/images/toyota-prado-1.jpg")}
        />
        <VehicleCard
          cardLabel="Honda Civic EK"
          comments="168"
          rating="10.0"
          location="Islamabad, Punjab"
          rent="3500"
          image={require("../assets/images/civic003.jpg")}
        />
        <VehicleCard
          cardLabel="Honda Civic EK"
          comments="168"
          rating="10.0"
          location="Islamabad, Punjab"
          rent="3500"
          image={require("../assets/images/civic003.jpg")}
        />
        <VehicleCard
          cardLabel="Honda Civic EK"
          comments="168"
          rating="10.0"
          location="Islamabad, Punjab"
          rent="3500"
          image={require("../assets/images/civic003.jpg")}
        />
        <VehicleCard
          cardLabel="Honda Civic EK"
          comments="168"
          rating="10.0"
          location="Islamabad, Punjab"
          rent="3500"
          image={require("../assets/images/civic003.jpg")}
        />
        <VehicleCard
          cardLabel="Honda Civic EK"
          comments="168"
          rating="10.0"
          location="Islamabad, Punjab"
          rent="3500"
          image={require("../assets/images/civic003.jpg")}
        />
        <VehicleCard
          cardLabel="Honda Civic EK"
          comments="168"
          rating="10.0"
          location="Islamabad, Punjab"
          rent="3500"
          image={require("../assets/images/civic003.jpg")}
        />
        <VehicleCard
          cardLabel="Honda Civic EK"
          comments="168"
          rating="10.0"
          location="Islamabad, Punjab"
          rent="3500"
          image={require("../assets/images/civic003.jpg")}
        />
        <VehicleCard
          cardLabel="Honda Civic EK"
          comments="168"
          rating="10.0"
          location="Islamabad, Punjab"
          rent="3500"
          image={require("../assets/images/civic003.jpg")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  vehicleCardsContainer: {
    width: wp(99),
    height: hp(70),
    marginTop: hp(1)
  },
  headerContainer: {
    flexDirection: "row",
    position: "relative",
    width: wp(100),
    height: hp(10),
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(2.5)
  },
  header: {
    fontFamily: FontFamily.breeSerifRegular,
    fontSize: 30,
    flexWrap: "wrap",
    width: wp(45)
  },
  logoContainer: {
    width: wp(25),
    height: hp(25),
    borderRadius: wp(50),
    resizeMode: "contain"
  },
  filterBtnContainer: {
    paddingHorizontal: wp(6),
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  filter: {
    fontFamily: FontFamily.ubuntuLight,
    fontSize: 14,
    color: Color.grey
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(6),
    paddingVertical: hp(1)
  },
  category: {
    fontFamily: FontFamily.ubuntuBold,
    fontSize: 16,
    color: Color.dark
  }
};

export default Home;
