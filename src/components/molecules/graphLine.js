import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function GraphHeader(props) {
  const { hi, wi, day } = props;
  return (
    <View style={style.Card}>
      <View
        style={{
          height: hi,
          width: wi,
          backgroundColor: "#B7C9D2",
          borderRadius: 20,
        }}
      ></View>
      <Text style={{ marginTop: 7, fontSize: 12, opacity: 0.7 }}>{day}</Text>
    </View>
  );
}
export default GraphHeader;
const style = StyleSheet.create({
  Card: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
