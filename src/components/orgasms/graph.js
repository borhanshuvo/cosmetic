import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import GraphHeader from "../molecules/graphHeader";
import GraphLine from "../molecules/graphLine";

function Graph({ setYear, year, stateValue }) {
  return (
    <View style={style.Card}>
      <GraphHeader setYear={setYear} year={year} stateValue={stateValue} />
      <View
        style={{
          height: 180,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <GraphLine
          hi={`${parseInt(stateValue?.jan) / 100}%`}
          wi={20}
          day="Jan"
        />
        <GraphLine
          hi={`${parseInt(stateValue?.fab) / 100}%`}
          wi={20}
          day="Feb"
        />
        <GraphLine
          hi={`${parseInt(stateValue?.mar) / 100}%`}
          wi={20}
          day="Mar"
        />
        <GraphLine
          hi={`${parseInt(stateValue?.apr) / 100}%`}
          wi={20}
          day="Apr"
        />
        <GraphLine
          hi={`${parseInt(stateValue?.may) / 100}%`}
          wi={20}
          day="May"
        />
        <GraphLine
          hi={`${parseInt(stateValue?.jun) / 100}%`}
          wi={20}
          day="Jun"
        />
        <GraphLine
          hi={`${parseInt(stateValue?.jul) / 100}%`}
          wi={20}
          day="Jul"
        />
        <GraphLine
          hi={`${parseInt(stateValue?.aug) / 100}%`}
          wi={20}
          day="Aug"
        />
        <GraphLine
          hi={`${parseInt(stateValue?.sep) / 100}%`}
          wi={20}
          day="Sep"
        />
        <GraphLine
          hi={`${parseInt(stateValue?.oct) / 100}%`}
          wi={20}
          day="Oct"
        />
        <GraphLine
          hi={`${parseInt(stateValue?.nov) / 100}%`}
          wi={20}
          day="Nov"
        />
        <GraphLine
          hi={`${parseInt(stateValue?.dec) / 100}%`}
          wi={20}
          day="Dec"
        />
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
