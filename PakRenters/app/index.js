import { Stack, useRouter } from "expo-router";
import { React, useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Color } from "../constants/GlobalStyles";
import HeaderBtn from "../components/headerBtn";
import icons from "../constants/icons";
import VehicleCard from "../components/vehicleCard";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const Home = () => {
  const router = useRouter();

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
          headerLeft: () =>
            <HeaderBtn iconURL={icons.menu} dimension={"60%"} />,
          headerRight: () => <HeaderBtn />
        }}
      />
      <View>
        <Text>Welcome to PakRenters</Text>
      </View>

      <ScrollView style={styles.vehicleCardsContainer}>
        <VehicleCard
          cardLabel="Toyota Prado"
          comments="43"
          rating="1.0"
          location="Gujrat, Punjab"
          rent="5000"
          image="../assets/images/PakRenters-v3.0.jpg"
        />
        <VehicleCard text="Hello World 2" />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  vehicleCardsContainer: {
    width: wp(99),
    height: hp(60)
  }
};

export default Home;
