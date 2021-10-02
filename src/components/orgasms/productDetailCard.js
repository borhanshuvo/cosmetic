import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Stars from "../atoms/stars";
import CounterCard from "../molecules/counterCard";
import { useNavigation } from "@react-navigation/native";
function ProductDetailCard() {
  const navigation = useNavigation();
  return (
    <View style={style.main}>
      <Stars />
      <View style={style.line}></View>
      <View style={style.card}>
        <Text style={{ opacity: 0.8 }}>Skin Care Lotion</Text>
        <Text style={{ opacity: 0.5, fontSize: 9, width: "90%", marginTop: 5 }}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </Text>
        <TouchableOpacity>
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
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <CounterCard value="29.00" />
      </View>
      <View style={style.buttons}>
        <TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate("UserCheckOut")}
        >
          <Text style={{ fontSize: 12, color: "white" }}>Order Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.button2}
          onPress={() => navigation.navigate("UserBidRequest")}
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
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
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
    marginTop: 18,
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
});
