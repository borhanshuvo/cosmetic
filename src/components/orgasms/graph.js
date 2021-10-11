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
        <GraphLine hi="80%" wi={20} day="Jan" />
        <GraphLine hi="70%" wi={20} day="Feb" />
        <GraphLine hi="75%" wi={20} day="Mar" />
        <GraphLine hi="98%" wi={20} day="Apr" />
        <GraphLine hi="87%" wi={20} day="May" />
        <GraphLine hi="90%" wi={20} day="Jun" />
        <GraphLine hi="10%" wi={20} day="Jul" />
        <GraphLine hi="40%" wi={20} day="Aug" />
        <GraphLine hi="80%" wi={20} day="Sep" />
        <GraphLine hi="40%" wi={20} day="Oct" />
        <GraphLine hi="30%" wi={20} day="Nov" />
        <GraphLine hi="50%" wi={20} day="Dec" />
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
