import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Stars from "../atoms/stars";
import CounterCheckOut from "../molecules/counterCheckOut";

function CheckOutCard() {
  return (
    <View style={style.main}>
      <View style={style.view1}>
        <Text style={style.text1}>Quantity</Text>
        <Text style={style.text1}>03</Text>
      </View>
      <View style={style.line}></View>
      <View style={style.card}></View>
      <View style={{ marginTop: 10 }}>
        <CounterCheckOut value="Product Name" />
        <CounterCheckOut value="Product Name2" />
        <CounterCheckOut value="Product Name3" />
      </View>
      <View style={style.buttons}>
        <TouchableOpacity>
          <Text style={{ fontSize: 13, color: "black" }}>Total Amount</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.button2}>
          <Text style={{ fontSize: 15, color: "black", opacity: 0.6 }}>
            $78.00
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <View style={style.button}>
          <Text style={{ fontSize: 15, color: "white" }}>Check Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default CheckOutCard;

const style = StyleSheet.create({
  main: {
    backgroundColor: "white",
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 20,
    paddingLeft: 22,
    paddingRight: 22,
    paddingBottom: 20,
  },
  view1: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#B7C9D2",
    alignItems: "center",
    borderRadius: 16,
    paddingTop: 14,
    paddingBottom: 14,
    elevation: 1,
    marginTop: 10,
  },
  button2: {
    width: "45%",
    display: "flex",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#B7C9D2",
    alignItems: "center",
    borderRadius: 16,
    paddingTop: 14,
    paddingBottom: 14,
  },
  text1: {
    fontSize: 13,
    color: "black",
    opacity: 0.8,
  },
});
