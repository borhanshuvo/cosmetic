import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

function BigLotionCard2(props) {
  const {
    title,
    dis,
    price,
    backColor,
    orderStatus,
    buttonBackColor,
    buttonWidth,
    ButtontextColor,
    buttonTextOpacity,
  } = props;
  return (
    <TouchableOpacity style={[style.view1, { backgroundColor: backColor }]}>
      <View style={style.view5}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/lotion2.png")}
            resizeMethod="resize"
            resizeMode="contain"
            style={style.image}
          />
          <View style={style.view4}>
            <Text style={{ fontSize: 12, color: "black", opacity: 0.7 }}>
              {title}
            </Text>

            <Text style={{ fontSize: 6, color: "grey" }}>{dis}</Text>
            <View
              style={{
                backgroundColor: buttonBackColor,
                width: buttonWidth,
                alignItems: "center",
                paddingTop: 4,
                paddingBottom: 4,
                borderRadius: 6,
                marginTop: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: ButtontextColor,
                  opacity: buttonTextOpacity,
                }}
              >
                {orderStatus}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={style.view3}>
        <Text style={{ fontSize: 9, color: "black", opacity: 0.7 }}>
          {price}
        </Text>
        <Image source={require("../../assets/icon.png")} style={style.image1} />
      </View>
    </TouchableOpacity>
  );
}
export default BigLotionCard2;

const style = StyleSheet.create({
  view1: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    padding: 4,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 20,
    justifyContent: "space-between",
  },
  view5: {
    width: 185,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  view3: {
    width: 70,

    alignItems: "center",
  },
  view4: {
    marginLeft: 5,
  },
  image: {
    height: 57,
    width: 57,
  },
  image1: {
    height: 26,
    width: 26,
    marginTop: 6,
    borderRadius: 10,
  },
});
