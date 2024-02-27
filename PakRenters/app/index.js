import { Stack, useRouter } from "expo-router";
import { React, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Color, FontFamily } from "../constants/GlobalStyles";
import HeaderBtn from "../components/headerBtn";
import VehicleCard from "../components/vehicleCard";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import SearchBar from "../components/searchBar";

const Categories = ["All", "Available", "Unavailable", "Trending"];

const Home = () => {
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState("All");

  const openMenu = () => {};

  const openLoginPage = () => {
    router.push("./screens/loginV2");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

      <View style={styles.searchAndFilterContainer}>
        {/* SEARCH BAR */}
        <SearchBar />
        {/* FILTER BUTTON */}
        <View style={styles.filterBtnContainer}>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filter}>Filters</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Container */}
      <View style={styles.categoryContainer}>
        <FlatList
          data={Categories}
          renderItem={({ item }) =>
            <TouchableOpacity
              style={{
                borderColor: Color.dark,
                borderWidth: hp(0.2),
                paddingVertical: hp(0.7),
                paddingHorizontal: wp(3),
                justifyContent: "center",
                alignItems: "center",
                borderRadius: wp(20)
              }}
            >
              <Text style={styles.category}>
                {item}
              </Text>
            </TouchableOpacity>}
          keyExtractor={item => item}
          horizontal
          contentContainerStyle={{ columnGap: wp(2) }}
          showsHorizontalScrollIndicator={false}
        />
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
  searchAndFilterContainer: {
    flex: 0.2,
    justifyContent: "center"
  },
  vehicleCardsContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 0.3,
    flexDirection: "row",
    position: "relative",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(2.5),
    marginVertical: hp(2)
  },
  header: {
    fontFamily: FontFamily.breeSerifRegular,
    fontSize: hp(4),
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
    fontSize: hp(2.5),
    color: Color.grey
  },
  categoryContainer: {
    flex: 0.08,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(1.8),
    paddingVertical: hp(1)
  },
  category: {
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(2),
    color: Color.dark
  }
};

export default Home;
