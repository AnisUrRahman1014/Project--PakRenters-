import { View, StyleSheet, SafeAreaView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Color, sizeManager } from "../../../constants/GlobalStyles";
import Vehicle from "../../classes/Vehicle";
import { FlatList } from "react-native-gesture-handler";
import VehicleCard from "../../../components/vehicleCardManageAds";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { ipAddress } from "../../../constants/misc";

const manageAds = () => {
  const { user } = useLocalSearchParams();
  const [postIds, setPostIds] = useState([]);

  useEffect(() => {
    fetchUserPosts();
  }, []);

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
          contentContainerStyle={{
            gap: 10,
            paddingVertical: sizeManager(1)
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: sizeManager(1)
  }
});

export default manageAds;
