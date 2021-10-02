import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

function LotionCard(props) {
  const { title, dis, price, onPress, ButtonClick } = props;
  return (
    <TouchableOpacity style={style.view1} onPress={onPress}>
      <View>
        <Image
          source={require("../../assets/lotionB.png")}
          resizeMethod="resize"
          resizeMode="contain"
          style={style.image}
        />
      </View>
      <View style={style.view4}>
        <Text style={{ fontSize: 10, color: "black", opacity: 0.7 }}>
          {title}
        </Text>
        <Text style={{ fontSize: 6, color: "grey" }}>{dis}</Text>
        <View style={style.view3}>
          <Text style={{ fontSize: 9, color: "black", opacity: 0.7 }}>
            {price}
          </Text>
          <TouchableOpacity onPress={ButtonClick}>
            <View style={style.view2}>
              <Image
                source={require("../../assets/basket.png")}
                resizeMethod="resize"
                resizeMode="contain"
                style={style.image2}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default LotionCard;

const style = StyleSheet.create({
  view1: {
    width: 165,
    backgroundColor: "white",
    alignItems: "center",
    padding: 8,
    margin: 8,
    borderRadius: 30,
  },

  image: {
    height: 110,
  },
  image2: {
    height: 30,
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
  view3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  view4: {
    width: 150,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
