import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import { Color, sizeManager } from "../../../constants/GlobalStyles";
import VehicleCard from "../../../components/vehicleCardBookingsManage";
import Vehicle from "../../classes/Vehicle";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { ipAddress } from "../../../constants/misc";

const manageBookings = () => {
  const { user } = useLocalSearchParams();
  const [postIds, setPostIds] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchUserPosts();
    }, [])
  );

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(
        `http://${ipAddress}:8000/post/getPostIdsByUserId/${user._id}`
      );
      if (response.status === 200) {
        setPostIds(response.data.data);
      } else {
        Alert.alert("Error", "Failed to fetch data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <FlatList
          data={postIds}
          renderItem={({ item }) => <VehicleCard postId={item._id} />}
          contentContainerStyle={{ gap: 10, paddingVertical: sizeManager(1) }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: sizeManager(2)
  }
});
export default manageBookings;
