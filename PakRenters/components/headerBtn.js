import { React } from "react";
import { TouchableOpacity, Image } from "react-native";
import { Color } from "../constants/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";

const HeaderBtn = ({
  iconName,
  onPress,
  iconColor,
  containerColor,
  iconSize
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ backgroundColor: containerColor }, styles.btnContainer]}
    >
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = {
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: Color.white,
    justifyContent: "center",
    alignItems: "center"
  },
  btnImage: dimension => ({
    width: dimension,
    height: dimension
  })
};

export default HeaderBtn;
