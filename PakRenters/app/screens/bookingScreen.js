import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color, FontFamily, sizeManager } from "../../constants/GlobalStyles";
import { useLocalSearchParams } from "expo-router";
import Calendar from "react-native-calendars/src/calendar";
import { CustomFormInputField, LargeBtnWithIcon } from "../../components/misc";

const BookingScreen = () => {
  const { vehicle } = useLocalSearchParams();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Image source={vehicle.image} style={styles.image} />
        </View>
        {/* Vehicle Details */}
        <View style={styles.header.container}>
          <Text style={styles.header.heading}>
            {vehicle.toString()}
          </Text>
          <Text style={styles.header.subHeading}>
            {vehicle.location}
          </Text>
        </View>
        {/* Calender */}
        <View style={styles.container}>
          <Calendar
            style={styles.calendar}
            onDayPress={date => console.log(date)}
            // use markedDates to handle already booked dates
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.label}>Receiving Details:</Text>
          <CustomFormInputField
            iconName={"check-square-o"}
            editable={false}
            placeHolder={
              "e.g. 27 June 2024 to 5 July 2024 i.e. 9 days.\nReturn on 6 July 2024"
            }
          />
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            paddingHorizontal: sizeManager(10)
          }}
        >
          <LargeBtnWithIcon
            icon={"arrow-circle-right"}
            iconColor={Color.white}
            btnLabel={"Proceed to payment"}
            btnColor={Color.focus}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 16 / 9
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  container: {
    padding: sizeManager(1)
  },
  calendar: {
    borderRadius: sizeManager(2),
    elevation: 10,
    margin: sizeManager(1),
    height: sizeManager(42)
  },
  header: {
    container: {
      width: "100%",
      padding: sizeManager(1),
      justifyContent: "center",
      alignItems: "center"
    },
    leftContainer: {
      flex: 1
    },
    rightContainer: {
      flex: 0.5
    },
    heading: {
      fontFamily: FontFamily.ubuntuMedium,
      color: Color.dark,
      fontSize: 22
    },
    subheading: {
      fontFamily: FontFamily.ubuntuRegular,
      fontSize: 20
    }
  }
});

export default BookingScreen;
