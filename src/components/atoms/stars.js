import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

function Stars() {
  return (
    <View style={style.main}>
      <Image
        source={require("../../assets/stars.png")}
        resizeMode="contain"
        resizeMethod="resize"
        style={style.image}
      />
      <Text style={style.text1}>4.0 Rating</Text>
    </View>
  );
}
export default Stars;

const style = StyleSheet.create({
  main: { display: "flex", flexDirection: "row", alignItems: "center" },
  image: {
    height: 15,
    width: 100,
  },
  text1: {
    fontSize: 9,
    opacity: 0.6,
    marginLeft: 8,
  },
});
