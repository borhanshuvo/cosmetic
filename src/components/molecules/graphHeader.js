import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function GraphHeader({ setYear, year, stateValue }) {
  return (
    <View style={style.Card}>
      <TouchableOpacity onPress={() => setYear(year - 1)}>
        <Image
          source={require("../../assets/left.png")}
          style={style.iconsStyle}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 10, opacity: 0.6 }}>{year}</Text>
        <Text style={{ fontSize: 12, opacity: 0.8 }}>
          {parseFloat(stateValue?.yearlyIncome).toFixed(2)} USD
        </Text>
      </View>
      <TouchableOpacity onPress={() => setYear(year + 1)}>
        <Image
          source={require("../../assets/right.png")}
          style={style.iconsStyle}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
export default GraphHeader;
const style = StyleSheet.create({
  Card: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  iconsStyle: {
    height: 15,
    width: 15,
  },
});
