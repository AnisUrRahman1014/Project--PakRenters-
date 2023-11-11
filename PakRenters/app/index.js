import { StyleSheet, Text, View, Touchable, Dimensions } from "react-native";

let mainBlue = '#182978';
let midBlue = '#6688CC';
let baseBlue = '#ACBFE6';

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text>Hello World</Text>
      </View>
    </View>
  );
}
