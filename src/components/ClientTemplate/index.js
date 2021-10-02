import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import ClientTabBar from "../orgasms/ClientTabBar";
function ClientAppTemplate(props) {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <View style={{ backgroundColor: "red", height: "91%" }}>
        {props?.children}
      </View>
      <View
        style={{
          backgroundColor: "#464646",
          height: "9%",
          display: "flex",
          justifyContent: "center",
          borderRadius: 30,
          paddingLeft: 26,
          paddingRight: 26,
        }}
      >
        <View>
          <ClientTabBar />
        </View>
      </View>
    </View>
  );
}

export default ClientAppTemplate;
