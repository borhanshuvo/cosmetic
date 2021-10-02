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
    reject,
    messageShow,
    message,
  } = props;
  return (
    <View style={[style.view1, { backgroundColor: backColor }]}>
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
            {messageShow ? (
              <View style={style.messageStyle}>
                <Text
                  style={{
                    fontSize: 10,
                    color: "black",
                    opacity: 0.6,
                  }}
                >
                  Buyer Wants to increase Bid
                </Text>
              </View>
            ) : null}

            <View style={{ flexDirection: "row", display: "flex" }}>
              <TouchableOpacity>
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
              </TouchableOpacity>
              {reject ? (
                <TouchableOpacity>
                  <View
                    style={{
                      width: buttonWidth,
                      alignItems: "center",
                      paddingTop: 4,
                      paddingBottom: 4,
                      borderRadius: 6,
                      marginTop: 4,
                      marginLeft: 10,
                      borderColor: "black",
                      borderWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: "black",
                        opacity: 0.6,
                      }}
                    >
                      Reject
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </View>

      <View style={style.view3}>
        <Text style={style.priceStyle}>{price}</Text>
      </View>
    </View>
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
  priceStyle: {
    fontSize: 9,
    color: "black",
    opacity: 0.7,
    marginBottom: 30,
  },
  messageStyle: {
    width: 175,
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 6,
    marginTop: 4,
    borderColor: "black",
    backgroundColor: "white",
    marginBottom: 4,
  },
});
