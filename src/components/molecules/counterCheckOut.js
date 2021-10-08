import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function CounterCheck(props) {
  const { value, quantity, setquantity, price } = props;

  return (
    <View style={style.main}>
      <Text style={[style.text1.opacity, { fontSize: 12 }]}>{value}</Text>
      <View style={style.view1}>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 12,
              color: "black",
              marginRight: 10,
              opacity: 0.8,
            }}
          >
            ${parseFloat(price).toFixed(2)}
          </Text>
        </TouchableOpacity>
        <View style={style.counter}>
          <TouchableOpacity
            onPress={() => {
              quantity > 1 ? setquantity(quantity - 1) : quantity;
            }}
          >
            <Text style={[style.text1, { marginTop: -11 }]}>_</Text>
          </TouchableOpacity>

          <Text style={style.text1}>{quantity}</Text>
          <TouchableOpacity onPress={() => setquantity(quantity + 1)}>
            <Text style={style.text1}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default CounterCheck;

const style = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 4,
  },
  view1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  counter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    width: 80,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: "space-between",
    borderColor: "#B7C9D2",
    borderRadius: 7,
  },
  text1: {
    opacity: 0.8,
  },
  button: {
    width: 65,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#B7C9D2",
    alignItems: "center",
    borderRadius: 7,
    marginLeft: 10,
    paddingTop: 2,
    paddingBottom: 2,
    elevation: 3,
  },
});
