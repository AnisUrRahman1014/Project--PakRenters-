import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Color,
  FontFamily,
  sizeManager
} from "../../../constants/GlobalStyles";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation
} from "expo-router";
import Calendar from "react-native-calendars/src/calendar";
import {
  CustomFormInputField,
  LargeBtnWithIcon
} from "../../../components/misc";
import DotIndicator from "../../../components/dotIndicator";
import BookingReport from "../../classes/BookingReport";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import { ipAddress } from "../../../constants/misc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BookingScreen = () => {
  // For navigation
  const navigation = useNavigation();
  // Parameter from previous screen
  const { post } = useLocalSearchParams();
  const { bookings } = post;
  const { vehicle, user } = post;
  const [customerId, setCustomerId] = useState(null);

  useFocusEffect(
    useCallback(() => {
      fetchCurrentUserAsCustomer();
      markBookedDates(bookings);
    }, [])
  );

  const fetchCurrentUserAsCustomer = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwtDecode(token);
        setCustomerId(decodedToken.userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Constants for this screen data handling
  let bookingReport;

  // For the dot indicator
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);
  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  // State for date selection
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [selectedDates, setSelectedDates] = useState({});
  const [bookingString, setBookingString] = useState("");
  const [bookedDates, setBookedDates] = useState([]);

  const markBookedDates = bookingData => {
    const datesToMark = {};
    bookingData.forEach(booking => {
      const { startDate, endDate } = booking;
      console.log("YE: " + startDate + " " + endDate);
      const range = getDatesInRange(startDate, endDate);
      range.forEach(date => {
        datesToMark[date] = {
          selected: true,
          selectedColor: "red",
          disabled: true,
          disableTouchEvent: true
        }; // Customize the appearance of booked dates
      });
    });
    setBookedDates(datesToMark);
  };

  const handleDayPress = day => {
    const date = day.dateString;
    if (bookedDates[date] && bookedDates[date].disabled) {
      // If the selected date is booked, return early
      return;
    }
    if (!startDate || (startDate && endDate)) {
      // If no start date is set or both start and end dates are set, reset the selection
      setStartDate(date);
      setEndDate(null);
      setSelectedDates({
        [date]: { selected: true, selectedColor: Color.focus }
      });
    } else if (dayjs(date).isBefore(dayjs(startDate))) {
      // If the selected date is before the start date, reset with the new start date
      setStartDate(date);
      setSelectedDates({
        [date]: { selected: true, selectedColor: Color.focus }
      });
    } else {
      // If the selected date is after the start date, set it as the end date and mark the range
      setEndDate(date);
      const range = getDatesInRange(startDate, date);
      const newSelectedDates = range.reduce((acc, current) => {
        acc[current] = {
          selected: true,
          selectedColor: Color.focus
        };
        return acc;
      }, {});
      setSelectedDates(newSelectedDates);
      updateBookingString(startDate, date);
    }
  };

  const getDatesInRange = (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const range = [];
    let current = startDate;

    while (current.isBefore(endDate) || current.isSame(endDate)) {
      range.push(current.format("YYYY-MM-DD"));
      current = current.add(1, "day");
    }
    return range;
  };

  const updateBookingString = (start, end) => {
    const startDate = dayjs(start).format("DD MMM YYYY");
    const endDate = dayjs(end).format("DD MMM YYYY");
    const numberOfDays = dayjs(end).diff(dayjs(start), "day") + 1;
    setBookingString(
      `${startDate} to ${endDate} i.e. ${numberOfDays} days.\nReturn on ${endDate}`
    );
    setNumberOfDays(numberOfDays);
  };

  // For rendering images of the vehicle
  const renderImageItem = ({ item }) =>
    <Image
      source={{ uri: `http://${ipAddress}:8000/${item}` }}
      style={styles.image}
    />;

  // Handling proceed to the next screen
  const handleProceed = () => {
    if (startDate && endDate) {
      bookingReport = new BookingReport(
        user._id,
        customerId,
        post,
        startDate,
        endDate,
        numberOfDays,
        post.rent
      );
      console.log(bookingReport);
      navigation.navigate("screens/(bookingScreens)/bookingReport", {
        report: bookingReport,
        renter: user,
        customerId: customerId
      });
    }
  };
  console.log({ ...bookedDates });
  const renderItem = () =>
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <FlatList
          ref={flatListRef}
          data={vehicle.images}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={sizeManager(30)}
          snapToAlignment="center"
          decelerationRate="fast"
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          nestedScrollEnabled
        />
        <DotIndicator
          currentIndex={currentIndex}
          totalImages={vehicle.images.length}
        />
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
      {/* Calendar */}
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          onDayPress={handleDayPress}
          markingType="multi-dot"
          markedDates={{ ...bookedDates, ...selectedDates }}
          headerStyle={{
            borderTopLeftRadius: sizeManager(2),
            borderTopRightRadius: sizeManager(2)
          }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Receiving Details:</Text>
        <CustomFormInputField
          iconName={"check-square-o"}
          editable={false}
          placeHolder={bookingString}
        />
      </View>
      <View style={styles.buttonContainer}>
        <LargeBtnWithIcon
          icon={"arrow-circle-right"}
          iconColor={Color.white}
          btnLabel={"Proceed to payment"}
          btnColor={Color.focus}
          onPress={handleProceed}
        />
      </View>
    </View>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
      <FlatList
        data={[{ key: "main" }]} // Single item for the main content
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    paddingBottom: sizeManager(5)
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: sizeManager(2)
  },
  image: {
    width: sizeManager(50),
    aspectRatio: 16 / 9,
    resizeMode: "cover"
  },
  container: {
    padding: sizeManager(1)
  },
  calendar: {
    height: "auto",
    borderRadius: sizeManager(2),
    elevation: 10,
    marginVertical: sizeManager(1),
    paddingBottom: sizeManager(1),
    color: Color.white
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
    subHeading: {
      fontFamily: FontFamily.ubuntuRegular,
      fontSize: 20
    }
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: sizeManager(10)
  },
  label: {
    fontFamily: FontFamily.ubuntuMedium,
    fontSize: 18,
    color: Color.dark,
    paddingVertical: sizeManager(1)
  }
});

export default BookingScreen;
