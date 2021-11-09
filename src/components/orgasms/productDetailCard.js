import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Stars from "../atoms/stars";
import CounterCard from "../molecules/counterCard";
import { useNavigation } from "@react-navigation/native";
function ProductDetailCard({ product }) {
  const navigation = useNavigation();
  return (
    <View style={style.main}>
      <Stars />
      <View style={style.line}></View>
      <View style={style.card}>
        <Text style={{ opacity: 0.8, marginTop: 6 }}>{product?.title}</Text>
        <Text style={{ opacity: 0.5, fontSize: 9, width: "90%", marginTop: 5 }}>
          {product?.description}
        </Text>
        {/* <TouchableOpacity>
          <Text
            style={{
              opacity: 0.7,
              fontSize: 11,
              textDecorationLine: "underline",
              marginTop: 8,
            }}
          >
            Seller Info
          </Text>
        </TouchableOpacity> */}
      </View>
      <View style={{ marginTop: 12, marginBottom: 12 }}>
        {/* <CounterCard value={product.price} />$<Text></Text> */}
        <Text style={[style.text1.opacity, { fontSize: 13 }]}>
          ${parseFloat(product?.price).toFixed(2)}
        </Text>
      </View>
      <View style={style.buttons}>
        <TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate("UserCheckOut", { id: product?._id })}
        >
          <Text style={{ fontSize: 12, color: "white" }}>Order Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.button2}
          onPress={() => navigation.navigate("UserBidRequest", { id: product?._id })}
        >
          <Text style={{ fontSize: 12, color: "black", opacity: 0.7 }}>
            Place Bid
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default ProductDetailCard;

const style = StyleSheet.create({
  main: {
    backgroundColor: "white",
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
  },
  line: {
    height: 1,
    backgroundColor: "#E8E3E3",
    width: "100%",
    marginTop: 14,
    opacity: 0.6,
  },
  card: { marginTop: 10 },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 174,
  },
  button: {
    width: "45%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#B7C9D2",
    alignItems: "center",
    borderRadius: 16,
    paddingTop: 17,
    paddingBottom: 17,
    elevation: 1,
  },
  button2: {
    width: "45%",
    display: "flex",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#B7C9D2",
    alignItems: "center",
    borderRadius: 16,
    paddingTop: 17,
    paddingBottom: 17,
  },
  text1: {
    opacity: 0.8,
  },
});
