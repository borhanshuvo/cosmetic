import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function CounterCard(props) {
  const { value } = props;
  const [quantity, setquantity] = useState(1);

  return (
    <View style={style.main}>
      <Text style={[style.text1.opacity, { fontSize: 13 }]}>
        ${parseFloat(value).toFixed(2)}
      </Text>
      <View style={style.view1}>
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
        <TouchableOpacity style={style.button}>
          <Text style={{ fontSize: 12, color: "white" }}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default CounterCard;

const style = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  view1: {
    display: "flex",
    flexDirection: "row",
  },
  counter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    width: 80,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
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
