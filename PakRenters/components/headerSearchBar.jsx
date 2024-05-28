import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Color, sizeManager } from "../constants/GlobalStyles";
import { CustomFormInputField } from "./misc";

const HeaderSearchBar = () => {
  const [search, setSearchString] = useState("");
  return (
    <View style={styles.mainContainer}>
      <View style={styles.fieldContainer}>
        <CustomFormInputField
          iconName={"search"}
          placeHolder={"Search"}
          onChange={setSearchString}
          value={search}
          borderVisible={false}
        />
      </View>
    </View>
  );
};

export default HeaderSearchBar;

const styles = StyleSheet.create({
  mainContainer: {
    width: "80%",
    height: "60%",
    backgroundColor: Color.lightGrey,
    borderRadius: sizeManager(1),
    justifyContent: "center",
    padding: sizeManager(0.5)
  },
  fieldContainer: {
    width: "100%"
  }
});
