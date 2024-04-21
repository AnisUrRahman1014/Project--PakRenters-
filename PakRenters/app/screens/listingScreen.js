import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { React, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from "react-native";
import {
  Color,
  FontFamily,
  globalStyles,
  horizontal_flatlist_Buttons
} from "../../constants/GlobalStyles";
import VehicleCard from "../../components/vehicleCard0";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import SearchBar from "../../components/searchBar";
import Vehicle from "../classes/Vehicle";

const Filters = ["All", "Available", "Unavailable", "Trending"];

const vehicles = [
  new Vehicle(
    1,
    "Honda",
    "Civic EK",
    "1.6 cc",
    5,
    "Manual",
    "No",
    "Yes",
    "No",
    "Islamabad,Punjab",
    3500,
    250,
    4.9,
    require("../../assets/images/civic003.jpg")
  ),
  new Vehicle(
    2, // Assuming '1' as an ID for this example
    "Toyota",
    "Prado", // vehicleName
    "2.0 cc",
    7,
    "Auto",
    "Yes",
    "Yes",
    "Yes",
    "Gujrat, Punjab", // location
    "5000", // rent
    "43", // comments
    "1.0", // rating
    require("../../assets/images/toyota-prado-1.jpg") // image
  ),
  new Vehicle(
    3,
    "Honda",
    " Civic EK",
    "1.6 cc",
    5,
    "Manual",
    "No",
    "Yes",
    "No",
    "Islamabad,Punjab",
    3500,
    250,
    4.9,
    require("../../assets/images/civic003.jpg")
  )
];
const ListingScreen = ({ route }) => {
  const { categoryName } = useLocalSearchParams();
  console.log(categoryName);

  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");

  const generateScreenTitle = () => {
    let headerTitle = categoryName;
    if (categoryName.endsWith("s")) {
      headerTitle = headerTitle.concat("es");
    } else {
      headerTitle = headerTitle.concat("s");
    }
    return headerTitle;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: generateScreenTitle().toUpperCase(),
          headerTintColor: Color.dark,
          headerTitleAlign: "center",
          headerShadowVisible: false
        }}
      />
      <View style={styles.mainContainer}>
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
            data={Filters}
            renderItem={({ item }) =>
              <TouchableOpacity style={globalStyles.horizontalFlatListBtn}>
                <Text style={globalStyles.flatListButtonLabelStyle}>
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
        <View style={styles.vehicleCardsContainer}>
          <FlatList
            data={vehicles}
            renderItem={({ item }) => <VehicleCard vehicle={item} />}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={{ alignItems: "center" }}
          />
        </View>

        {/* <ScrollView style={styles.vehicleCardsContainer}>
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
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white
  },
  searchAndFilterContainer: {
    flex: 0.2,
    justifyContent: "center"
  },
  vehicleCardsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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

export default ListingScreen;
