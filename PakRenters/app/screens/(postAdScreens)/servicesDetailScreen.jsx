import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";
import {
  Color,
  FontFamily,
  sizeManager
} from "../../../constants/GlobalStyles";
import { useLocalSearchParams } from "expo-router";
import { LargeBtnWithIcon, ServiceSwitch } from "../../../components/misc";
import { Services } from "../../../constants/Services";

const ServicesDetail = () => {
  const { post, vehicle } = useLocalSearchParams();

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
    updateDatabase();
  };

  const updateDatabase = () => {
    // IMPLEMENTATION PENDING
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
