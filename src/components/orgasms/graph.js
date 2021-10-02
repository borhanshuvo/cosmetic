import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import GraphHeader from "../molecules/graphHeader";
import GraphLine from "../molecules/graphLine";

function Graph() {
  return (
    <View style={style.Card}>
      <GraphHeader />
      <View
        style={{
          height: 180,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <GraphLine hi="80%" wi={20} day="S" />
        <GraphLine hi="70%" wi={20} day="S" />
        <GraphLine hi="75%" wi={20} day="M" />
        <GraphLine hi="98%" wi={20} day="T" />
        <GraphLine hi="87%" wi={20} day="W" />
        <GraphLine hi="90%" wi={20} day="T" />
        <GraphLine hi="40%" wi={20} day="F" />
      </View>
    </View>
  );
}
export default Graph;
const style = StyleSheet.create({
  Card: {
    backgroundColor: "white",
    display: "flex",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 22,
    borderRadius: 11,
    marginTop: 10,
  },
});
