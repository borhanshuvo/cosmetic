import { useRoute } from "@react-navigation/native";
import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import config from "../../../config";

function BigLotionCard(props) {
  const { title, dis, price, color, onPress, img, quantity } = props;
  const nav = useRoute();

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

          {/* {nav?.name !== "ClientCustomerProfile" && (
            <>
              {quantity === "0" ? (
                <Text style={{ fontSize: 10, color: "red" }}>Out Of Stock</Text>
              ) : (
                <Text style={{ fontSize: 10, color: "black" }}>
                  In a Stock ({quantity})
                </Text>
              )}
            </>
          )} */}
          <Text style={{ fontSize: 12, color: "grey", textAlign: "justify", width: 180 }}>
            {dis}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 10,
              color: "black",
            }}
          >
            ${parseFloat(price).toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default BigLotionCard;

const style = StyleSheet.create({
  view1: {
    width: 280,
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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 42,
    width: 42,
  },
  view4: {
    paddingLeft: 5,
    flexGrow: 1,
  },
});
