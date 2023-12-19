import {React,useState} from 'react'
import { View, Text } from 'react-native';
import loginMessages from '../../constants/loginMessages';
import {useFonts} from 'expo-font';
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from 'expo-router';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Color, FontFamily } from '../../constants/GlobalStyles';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fontsLoaded, error] = useFonts({
      "Ubuntu-Bold": require("../../assets/fonts/Ubuntu-Bold.ttf"),
      "Ubuntu-Regular": require("../../assets/fonts/Ubuntu-Regular.ttf")
    });

    if (!fontsLoaded && !error) {
      return null;
    }



    const usernameFieldHandler = inputText => {
      // Update the state for the username
      const removedSpaces = inputText.replace(/\s/g,"");
      setUsername(removedSpaces);
    };

    const passwordFieldHandler = inputText => {
      // Update the state for the password
      setPassword(inputText);
    };

    return <View style={styles.mainContainer}>
        {/* SHAPE */}
        <View style={styles.curve2}>
          <View style={styles.curve1}>
            <View style={styles.ovalShape}>
              <Text style={[styles.title, { fontSize: 20 }]}>
                Welcome to
              </Text>
              <Text
                style={[
                  styles.title,
                  { fontFamily: FontFamily.ubuntuBold }
                ]}
              >
                PakRenters
              </Text>
              <Text
                style={[styles.title, { fontSize: 18, marginTop: hp(2) }]}
              >
                Please sign in to continue
              </Text>
            </View>
          </View>
        </View>

        {/* USERNAME */}
        <View style={styles.usernameContainer}>
          <View style={styles.iconContainer}>
            <Icon name="user" size={30} color={Color.white} />
          </View>
          <View style={styles.fieldContainer}>
            <TextInput style={styles.inputField} placeholderTextColor={Color.grey} placeholder="Username" value={username} onChangeText={usernameFieldHandler} />
          </View>
        </View>
        {/* PASSWORD */}
        <View style={styles.passwordContainer}>
          <View style={styles.iconContainer}>
            <Icon name="lock" size={30} color={Color.white} />
          </View>
          <View style={styles.fieldContainer}>
            <TextInput
            style={styles.inputField}
            placeholderTextColor={Color.grey}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={passwordFieldHandler}
          />
          </View>
        </View>
        {/* FORGET PASSWORD */}
        <TouchableOpacity>
          <Text style={styles.forgotPassBtn}>Forgot Password?</Text>
        </TouchableOpacity>
        {/* LOGIN | REGISTER BUTTONS */}
        <View style={styles.btnContainer}>
          {/* REGISTER */}
          <TouchableOpacity style={styles.button} onPress={()=>{router.push("./signUp")}}>
            <Text style={styles.btnText}>
              {loginMessages.registerButtonLabel}
            </Text>
          </TouchableOpacity>
          {/* LOGIN BUTTON*/}
          <TouchableOpacity style={[styles.button, { backgroundColor: Color.focus }]} onPress={() => {
              console.log(username);
              console.log(password);
            }}>
            <Text style={styles.btnText}>
              {loginMessages.submitButtonLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>;
}

const styles = {
  mainContainer: {
    flex: 1,
    width: wp(100),
    height: hp(100),
    alignItems: "center"
  },
  ovalShape: {
    position: "relative",
    top: hp(-2),
    borderRadius: wp(100),
    backgroundColor: Color.dark,
    width: wp(110),
    height: hp(55),
    alignItems: "center"
  },
  curve1: {
    position: "relative",
    top: hp(-2),
    borderRadius: wp(100),
    backgroundColor: Color.medium,
    width: wp(110),
    height: hp(55),
    alignItems: "center",
    overflow: 'hidden',
  },
  curve2: {
    position: "relative",
    top: hp(-15),
    borderRadius: wp(100),
    backgroundColor: Color.focus,
    width: wp(110),
    height: hp(55),
    alignItems: "center",
    overflow: 'hidden',
  },
  title: {
    position: "relative",
    textAlign: 'center',
    top: hp(35),
    color: Color.white,
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 34,
    width: wp(100)
  },
  usernameContainer: {
    position: "relative",
    backgroundColor: Color.dark,
    borderRadius: wp(5),
    width: wp(80),
    height: hp(7),
    margin: hp(0.9),
    flexDirection: "row"
  },
  passwordContainer: {
    position: "relative",
    backgroundColor: Color.dark,
    borderRadius: wp(5),
    width: wp(80),
    height: hp(7),
    margin: hp(0.9),
    flexDirection: "row"
  },
  btnContainer: {
    position: "relative",
    width: wp(90),
    height: hp(10),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  button: {
    position: "relative",
    backgroundColor: Color.dark,
    borderRadius: wp(7),
    width: wp(37),
    height: hp(5),
    margin: hp(0.8),
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: {
    color: Color.white,
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 14
  },
  fieldContainer: {
    position: "relative",
    height: hp(7),
    justifyContent: "center"
  },
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: wp(15),
    height: hp(7)
  },
  inputField: {
    color: Color.white,
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: 14,
    width: wp(60)
  }
};

export default Login;

