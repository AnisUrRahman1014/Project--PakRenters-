import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Color,
  FontFamily,
  sizeManager
} from "../../../constants/GlobalStyles";
import { useLocalSearchParams } from "expo-router";
import RenterSummaryCard from "../../../components/renterSummaryCard";
import { LargeBtnWithIcon } from "../../../components/misc";
import DebitCardSummary from "../../../components/debitCardSummary";

const BookingReportScreen = () => {
  const { user, report, accessType } = useLocalSearchParams();
  if (!accessType) {
    console.log("No Access Type");
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.profileContainer}>
          <RenterSummaryCard
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
              {report.vehicle.make}
            </Text>
          </View>

          {/* Model */}
          <View style={styles.container.section}>
            <Text style={styles.container.label}>Model</Text>
            <Text style={styles.container.value}>
              {report.vehicle.model}
            </Text>
          </View>

          {/* Year */}
          <View style={styles.container.section}>
            <Text style={styles.container.label}>Year</Text>
            <Text style={styles.container.value}>
              {report.vehicle.year}
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
              <DebitCardSummary user={user} />
            </View>

            {/* Payment Btn Container */}
            <View style={styles.paymentBtnContainer}>
              <LargeBtnWithIcon
                icon={"check-circle"}
                iconColor={"white"}
                btnColor={Color.focus}
                btnLabel={"Book Now"}
                btnLabelColor={Color.white}
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
