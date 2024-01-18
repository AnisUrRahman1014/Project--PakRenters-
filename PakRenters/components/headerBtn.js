import { React } from "react";
import { TouchableOpacity, Image } from "react-native";
import { Color } from "../constants/GlobalStyles";
import Icon from "react-native-vector-icons/FontAwesome";

const HeaderBtn = ({ iconName, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={iconName} size={20} color={Color.white} />
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
