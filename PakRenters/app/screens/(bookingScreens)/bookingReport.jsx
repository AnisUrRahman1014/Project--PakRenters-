import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
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
import RenterSummaryCard from "../../../components/renterSummaryCard";
import { LargeBtnWithIcon } from "../../../components/misc";
import DebitCardSummary from "../../../components/debitCardSummary";
import axios from "axios";
import { ipAddress } from "../../../constants/misc";
import Message, { MessageTypes } from "../../classes/Message";

const BookingReportScreen = () => {
  const navigation = useNavigation();
  const {
    renter,
    report,
    customerId,
    accessType,
    customer
  } = useLocalSearchParams();
  if (customer) {
    customer.phoneNo = customer.phoneNumber;
  }

  const { vehicle } = report.post;
  if (!accessType) {
    console.log("No Access Type");
  }

  const handleBookNow = async () => {
    const reportData = {
      renterId: renter._id,
      customerId,
      startDate: report.fromDate,
      endDate: report.toDate,
      days: report.getTotalDays(),
      rentPerDay: report.rentPerDay,
      totalRent: report.getTotalBill(),
      payableSurcharge: report.getSurcharge()
    };
    try {
      const response = await axios.post(
        `http://${ipAddress}:8000/post/addBooking/${report.post._id}`,
        reportData
      );
      if (response.status === 200) {
        Alert.alert("Success", response.data.message);
        handleOpenChat();
      } else {
        Alert.alert("Booking Failed", "Please check the information");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkOrCreateChat = async (senderId, receiverId) => {
    try {
      const response = await axios.post(
        `http://${ipAddress}:8000/chats/checkOrCreateChat`,
        {
          senderId,
          receiverId
        }
      );

      if (response.status === 200) {
        console.log(response.data.chatId);
        return response.data.chatId;
      } else {
        throw new Error("Failed to check or create chat");
      }
    } catch (error) {
      console.error("Error in checkOrCreateChat:", error);
      throw error;
    }
  };

  const handleOpenChat = async () => {
    try {
      const chatId = await checkOrCreateChat(customerId, renter._id);
      const bookingMessage = new Message(
        chatId,
        customerId,
        `Hey, I booked your vehicle (Post Title: ${report.post
          .title}) for ${report.getTotalDays()} days, starting from ${report.fromDate}`,
        MessageTypes.TEXT,
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        })
      );
      bookingMessage.uploadMessage();
      navigation.navigate("screens/chatScreen", {
        receiver: renter,
        senderId: customerId,
        chatId: chatId
      });
    } catch (error) {
      console.error("Error in handleOpenChat:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.profileContainer}>
          <RenterSummaryCard
            user={!accessType ? renter : customer}
            showCallBtn={true}
            showMessageBtn={true}
            dualBtn={true}
          />
        </View>
        {/* Vehicle Details */}
        <View style={styles.container}>
          {/* Make */}
          <View style={styles.container.section}>
            <Text style={styles.container.label}>Make</Text>
            <Text style={styles.container.value}>
              {vehicle.make}
            </Text>
          </View>

          {/* Model */}
          <View style={styles.container.section}>
            <Text style={styles.container.label}>Model</Text>
            <Text style={styles.container.value}>
              {vehicle.model}
            </Text>
          </View>

          {/* Year */}
          <View style={styles.container.section}>
            <Text style={styles.container.label}>Year</Text>
            <Text style={styles.container.value}>
              {vehicle.year}
            </Text>
          </View>
        </View>

        {/* Booking Details (Days) */}
        <View style={styles.container}>
          {/* From Date */}
          <View style={styles.container.section}>
            <Text style={styles.container.label}>From</Text>
            <Text style={styles.container.value}>
              {report.fromDate}
            </Text>
          </View>

          {/* To Date */}
          <View style={styles.container.section}>
            <Text style={styles.container.label}>To</Text>
            <Text style={styles.container.value}>
              {report.toDate}
            </Text>
          </View>

          {/* Days */}
          <View style={styles.container.section}>
            <Text style={styles.container.label}>Day/s</Text>
            <Text style={styles.container.value}>
              {report.getTotalDays()}
            </Text>
          </View>
        </View>

        {/* Booking Details (Payment) */}
        <View style={styles.container}>
          {/* Rent Per Day */}
          <View style={styles.container.section}>
            <Text style={styles.container.label}>Rent Per Day</Text>
            <Text style={styles.container.value}>
              {report.rentPerDay + " Rs."}
            </Text>
          </View>

          {/* Total Rent */}
          <View style={styles.container.section}>
            <Text style={styles.container.label}>Total Rent</Text>
            <Text style={styles.container.value}>
              {report.getTotalBill() + " Rs."}
            </Text>
          </View>

          {/* Payable */}
          <View style={styles.container.section}>
            <Text style={styles.container.label}>Payable Surcharges</Text>
            <Text style={styles.container.value}>
              {report.getSurcharge() + " Rs."}
            </Text>
          </View>
        </View>

        {!accessType &&
          <View>
            <View style={styles.container}>
              <DebitCardSummary user={renter} />
            </View>

            {/* Payment Btn Container */}
            <View style={styles.paymentBtnContainer}>
              <LargeBtnWithIcon
                icon={"check-circle"}
                iconColor={"white"}
                btnColor={Color.focus}
                btnLabel={"Book Now"}
                btnLabelColor={Color.white}
                onPress={handleBookNow}
              />
            </View>
          </View>}
      </View>
    </SafeAreaView>
  );
};

export default BookingReportScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    padding: sizeManager(1)
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "100%",
    height: "auto",
    borderBottomWidth: sizeManager(0.2),
    borderColor: Color.dark,
    marginVertical: sizeManager(1),
    paddingVertical: sizeManager(1.5),
    paddingHorizontal: sizeManager(1),
    section: {
      flexDirection: "row",
      justifyContent: "space-between"
    },
    label: {
      fontFamily: FontFamily.ubuntuBold,
      fontSize: 16,
      color: Color.dark
    },
    value: {
      fontFamily: FontFamily.ubuntuRegular,
      fontSize: 16,
      color: Color.grey
    }
  },
  paymentBtnContainer: {
    width: "100%",
    paddingHorizontal: sizeManager(14)
  }
});
