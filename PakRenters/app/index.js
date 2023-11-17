import {useState} from 'react';
import { View,Text, ScrollView, SafeAreaView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import {Stack, useRouter} from 'expo-router';

const mainBlue = "#182978";
const midBlue = "#6688CC";
const baseBlue = "#ACBFE6";

// const App = () => {
//  const handlePress = () => {
//     console.log('Pressed');
//  };

//  return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <TouchableHighlight onPress={handlePress} underlayColor="gray">
//         <Text style={{ fontSize: 24 }}>TouchableHighlight</Text>
//       </TouchableHighlight>

//       <TouchableOpacity onPress={handlePress} style={{ marginTop: 20 }}>
//         <Text style={{ fontSize: 24 }}>TouchableOpacity</Text>
//       </TouchableOpacity>

//       <TouchableWithoutFeedback onPress={handlePress} style={{ marginTop: 20 }}>
//         <Text style={{ fontSize: 24 }}>TouchableWithoutFeedback</Text>
//       </TouchableWithoutFeedback>
//     </View>
//  );
// };

// export default App;

export default function Page() {
  return <View style={styles.container}>
      <View style={styles.outerOverlay}>
        <View style = {styles.midOverlay}>
          <View style = {styles.centerContainer}>
            <View style={styles.fieldContainer}>
              <Text style={styles.labelText}>Username / Phone number:</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity>
                <View style={styles.cancelButton}>
                  <Text>Cancel</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.loginButton}>
                  <Text>Login</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>;
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: mainBlue,
    borderRadius: "14px",
    width: "60vw",
    height: "75vh"
  },
  midOverlay: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: midBlue,
    borderRadius: "13px",
    width: "62vw",
    height: "77vh"
  },
  outerOverlay: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: baseBlue,
    borderRadius: "12px",
    width: "64vw",
    height: "79vh"
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
    borderRadius: "50px",
    backgroundColor: "white"
  },
  loginButton: {
    margin: '5px',
    alignItems: "center",
    justifyContent: "center",
    width: "100px",
    height: "30px",
    borderRadius: "50px",
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

// How to use touchable in React Native?
