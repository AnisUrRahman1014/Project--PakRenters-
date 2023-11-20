import {useState} from 'react';
import { View,Text} from "react-native";

const mainBlue = "#182978";
const midBlue = "#6688CC";
const baseBlue = "#ACBFE6";
const font = "Montserrat";
const fontSize = 18;
export default function Page() {
  return (
  <View style={styles.container}>
    <View style={styles.outerOverlay}>
      <View style={styles.midOverlay}>
        <View style={styles.centerContainer}>
          <Text>
            Hello World
          </Text>
        </View>
      </View>
    </View>
  </View>
    );
}

const styles = {
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: mainBlue,
    width: "100%",
    height: "100%"
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    radius: "14px",
    width: "95%",
    height: "95%"
  },
  midOverlay: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: midBlue,
    // borderRadius: "13px",
    width: "95%",
    height: "95%"
  },
  outerOverlay: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: baseBlue,
    // borderRadius: "12px",
    width: "95%",
    height: "95%"
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  cancelButton: {
    margin: '5px',
    alignItems: "center",
    justifyContent: "center",
    width: "100px",
    height: "30px",
    // borderRadius: "50px",
    backgroundColor: "white"
  },
  loginButton: {
    margin: '5px',
    alignItems: "center",
    justifyContent: "center",
    width: "100px",
    height: "30px",
    // borderRadius: "50px",
    backgroundColor: "white"
  },
  fieldContainer: {
    width: '80%',
    height: '50%',
  },
  blackOverlay:{
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: '25%',
  },
  labelText:{
    color: 'white',
  }
};
