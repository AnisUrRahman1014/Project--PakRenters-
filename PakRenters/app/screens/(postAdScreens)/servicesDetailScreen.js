import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  FlatList
} from "react-native";
import React, { useState } from "react";
import {
  Color,
  FontFamily,
  StatusColors,
  sizeManager
} from "../../../constants/GlobalStyles";
import { useLocalSearchParams } from "expo-router";
import { LargeBtnWithIcon, ServiceSwitch } from "../../../components/misc";

const ServicesDetail = () => {
  const { post, vehicle } = useLocalSearchParams();

  const [isSelfDrive, setSelfDrive] = useState(false);
  const [isWithDriver, setWithDriver] = useState(false);
  const [isDecoration, setDecoration] = useState(false);
  const [isPassengerPnD, setPassengerPnD] = useState(false);
  const [isVehiclePnD, setVehiclePnD] = useState(false);

  const [services, setServices] = useState([
    { label: "Self Drive", isEnabled: true },
    { label: "With Driver", isEnabled: false },
    { label: "Decoration", isEnabled: false },
    { label: "Pick & Drop (Passenger)", isEnabled: false },
    { label: "Pick & Drop (Vehicle)", isEnabled: false }
  ]);

  const toggleService = index => {
    setServices(prevServices =>
      prevServices.map(
        (service, i) =>
          i === index ? { ...service, isEnabled: !service.isEnabled } : service
      )
    );
  };

  const updateSelectedServiceConstants = () => {
    services.forEach(service => {
      switch (service.label) {
        case "Self Drive":
          setSelfDrive(service.isEnabled);
          break;
        case "With Driver":
          setWithDriver(service.isEnabled);
          break;
        case "Decoration":
          setDecoration(service.isEnabled);
          break;
        case "Pick & Drop (Passenger)":
          setPassengerPnD(service.isEnabled);
          break;
        case "Pick & Drop (Vehicle)":
          setVehiclePnD(service.isEnabled);
          break;
        default:
          break;
      }
    });
  };

  const handleProceed = () => {
    updateSelectedServiceConstants();
    console.log(services);
    // Additional logic for proceeding, like navigation or API calls
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
