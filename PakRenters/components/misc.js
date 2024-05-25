import { React } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Color,
  FontFamily,
  StatusColors,
  sizeManager
} from "../constants/GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";

export const CustomFormInputField = ({
  iconName,
  placeHolder,
  onChange,
  value,
  secureEntry = false,
  textType,
  keyboardType = "default",
  editable = true,
  isIcon = true,
  borderVisible = true,
  multiline = false
}) => {
  return (
    <View style={styles.mainContainer(borderVisible)}>
      <View style={styles.customInputField.innerContainer}>
        {isIcon &&
          <View style={styles.customInputField.iconContainer}>
            <Icon
              name={iconName}
              size={20}
              color={Color.dark}
              width={wp(7)}
              alignItems={"center"}
              justifyContent={"center"}
            />
          </View>}
        <View style={styles.customInputField.fieldContainer}>
          <TextInput
            placeholder={placeHolder}
            value={value}
            onChangeText={onChange}
            placeholderTextColor={Color.grey}
            fontFamily={FontFamily.ubuntuRegular}
            fontSize={16}
            paddingHorizontal={wp(2)}
            width={"100%"}
            secureTextEntry={secureEntry}
            textContentType={textType}
            keyboardType={keyboardType}
            autoCapitalize="none"
            editable={editable}
            multiline={multiline}
          />
        </View>
      </View>
    </View>
  );
};

export const CustomAdInputField = ({
  placeHolder,
  onChange,
  value,
  textType,
  keyboardType = "default",
  multiline = false,
  editable = true,
  id,
  borderVisible = true
}) => {
  return (
    <View style={styles.mainContainer(borderVisible)}>
      <View style={styles.innerContainer}>
        <TextInput
          placeholder={placeHolder}
          value={value}
          onChangeText={onChange}
          placeholderTextColor={Color.grey}
          fontFamily={FontFamily.ubuntuRegular}
          fontSize={16}
          paddingHorizontal={wp(2)}
          width={sizeManager(46)}
          textContentType={textType}
          keyboardType={keyboardType}
          multiline={multiline}
          editable={editable}
          id={id}
        />
      </View>
      {/* <Separator width={70} height={0.2} /> */}
    </View>
  );
};

export const LargeBtn = ({
  onPress,
  btnLabel,
  btnColor,
  btnLabelColor = Color.white
}) => {
  return (
    <TouchableOpacity style={styles.largeBtn(btnColor)} onPress={onPress}>
      <Text style={[styles.largeLabel(btnLabelColor)]}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
};

export const LargeBtnWithIcon = ({
  onPress,
  btnLabel,
  btnColor,
  icon,
  iconColor,
  btnBorderColor,
  btnLabelColor = Color.white
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.largeBtn(btnColor, btnBorderColor),
        {
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: sizeManager(1),
          width: "auto",
          gap: sizeManager(2)
        }
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.largeLabel(btnLabelColor),
          { paddingLeft: sizeManager(1) }
        ]}
      >
        {btnLabel}
      </Text>
      <Icon name={icon} size={30} color={iconColor} />
    </TouchableOpacity>
  );
};

export const Smallbtn = ({
  onPress,
  btnLabel,
  btnColor,
  btnLabelColor = Color.white
}) => {
  return (
    <TouchableOpacity style={styles.smallBtn} onPress={onPress}>
      <Text
        style={[
          styles.largeLabel(btnLabelColor),
          { backgroundColor: { btnColor } }
        ]}
      >
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
};

export const TextOnlyBtn = ({ onPress, btnLabel }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
};

export const SpecsDisplay = ({ specLabel, iconName, triplePerRow = false }) => {
  return (
    <View style={styles.specsDisplayContainer(triplePerRow)}>
      <View style={styles.specsIconContainer}>
        <MaterialCommunityIcon name={iconName} size={30} color={Color.dark} />
      </View>
      <Text style={styles.specLabel(triplePerRow)}>
        {specLabel}
      </Text>
    </View>
  );
};
export const SpecsDisplayInput = ({
  iconName,
  options,
  setValue,
  triplePerRow = false
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleValueChange = itemValue => {
    setSelectedValue(itemValue);
    setValue(itemValue);
    setIsFocus(false);
  };
  return (
    <View style={styles.specsDisplayContainer(triplePerRow)}>
      <View style={styles.specsIconContainer}>
        <MaterialCommunityIcon name={iconName} size={30} color={Color.dark} />
      </View>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.dropdownPlaceholder}
        selectedTextStyle={styles.selectedTextStyle}
        data={options}
        maxHeight={100}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select" : "..."}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleValueChange}
        value={selectedValue}
      />
    </View>
  );
};

export const ServiceSwitch = ({
  serviceLabel,
  isEnabled,
  onToggle,
  disableToggle = false
}) => {
  return (
    <View style={styles.serviceSwitch.container}>
      <View style={styles.serviceSwitch.switchContainer}>
        <Switch
          trackColor={{ false: Color.lightGrey, true: Color.dark }}
          thumbColor={isEnabled ? Color.focus : Color.grey}
          onValueChange={onToggle}
          value={isEnabled}
          disabled={disableToggle}
        />
      </View>
      <View style={styles.serviceSwitch.serviceLabelContainer}>
        <Text style={styles.serviceSwitch.serviceLabel}>
          {serviceLabel}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: wp(70)
  },
  customInputField: {
    innerContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%"
    },
    iconContainer: {
      flex: 0.1
    },
    fieldContainer: {
      flex: 1
    }
  },
  iconContainer: {
    width: wp(5)
  },
  mainContainer: borderVisible => ({
    flexDirection: "column",
    borderWidth: wp(0.2),
    padding: wp(1),
    borderColor: borderVisible ? Color.dark : "transparent"
  }),
  largeBtn: (btnColor, btnBorderColor) => ({
    position: "relative",
    backgroundColor: btnColor,
    width: wp(50),
    height: hp(5),
    borderRadius: hp(25),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: btnBorderColor ? sizeManager(0.2) : 0,
    borderColor: btnBorderColor
  }),
  largeLabel: btnLabelColor => ({
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: hp(2),
    color: btnLabelColor
  }),
  smallBtn: {
    position: "relative",
    backgroundColor: Color.dark,
    width: wp(25),
    height: hp(5),
    borderRadius: hp(25),
    justifyContent: "center",
    alignItems: "center"
  },
  specsDisplayContainer: triplePerRow => ({
    flexDirection: "row",
    width: triplePerRow ? sizeManager(30) : sizeManager(15),
    height: sizeManager(3),
    alignItems: "center",
    marginHorizontal: triplePerRow ? sizeManager(1.5) : sizeManager(2.5),
    marginVertical: wp(2)
  }),
  specsIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: wp(8),
    height: wp(7)
  },
  specLabel: triplePerRow => ({
    fontFamily: FontFamily.ubuntuRegular,
    fontSize: wp(4.5),
    color: Color.grey,
    paddingLeft: wp(2),
    marginRight: triplePerRow ? sizeManager(0.5) : sizeManager(1)
  }),
  dropdown: {
    width: sizeManager(14),
    fontFamily: FontFamily.ubuntuLight,
    marginHorizontal: sizeManager(1)
  },
  dropdownPlaceholder: {
    fontFamily: FontFamily.ubuntuRegular
  },
  serviceSwitch: {
    container: {
      width: "100%",
      height: "auto",
      flexDirection: "row",
      gap: sizeManager(0.5),
      paddingVertical: sizeManager(1),
      alignItems: "center"
    },
    serviceLabelContainer: {
      flex: 1,
      height: "auto"
    },
    serviceLabel: {
      fontFamily: FontFamily.ubuntuRegular,
      fontSize: sizeManager(2)
    },
    switchContainer: {
      flex: 0.2
    }
  }
};
