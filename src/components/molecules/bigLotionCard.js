import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import config from "../../../config";

function BigLotionCard(props) {
  const { title, dis, price, color, onPress, img, quantity } = props;
  return (
    <TouchableOpacity
      style={[style.view1, { backgroundColor: color }]}
      onPress={onPress}
    >
      <View style={style.view5}>
        <View>
          <Image
            source={{ uri: `${config.APP_URL}${img}` }}
            resizeMethod="resize"
            resizeMode="contain"
            style={style.image}
          />
        </View>
        <View style={style.view4}>
          <Text style={{ fontSize: 14, color: "black", opacity: 0.7 }}>
            {title}
          </Text>
          {quantity === "0" ? (
            <Text style={{ fontSize: 10, color: "red" }}>Out Of Stock</Text>
          ) : (
            <Text style={{ fontSize: 10, color: "black" }}>
              In a Stock - {quantity}
            </Text>
          )}
          <Text style={{ fontSize: 12, color: "grey" }}>{dis}</Text>
        </View>
      </View>

      <View style={style.view3}>
        <Text
          style={{
            fontSize: 10,
            color: "black",
            opacity: 0.7,
            marginTop: -35
          }}
        >
          ${parseFloat(price).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export default BigLotionCard;

const style = StyleSheet.create({
  view1: {
    width: 250,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    margin: 8,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 12,
  },
  view5: {
    width: 185,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 42,
    width: 42,
  },

  view2: {
    backgroundColor: "#B7C9D2",
    height: 26,
    width: 26,
    borderRadius: 6,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  //   view3: {
  //     display: "flex",
  //     flexDirection: "row",

  //     alignItems: "center",
  //   },
  view4: {
    paddingLeft: 5,
  },
});
