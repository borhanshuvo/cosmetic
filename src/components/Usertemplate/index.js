import React from "react";
import { View } from "react-native";
import UserTabBar from "../orgasms/UsertabBar";
function UserAppTemplate(props) {
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
          <UserTabBar />
        </View>
      </View>
    </View>
  );
}

export default UserAppTemplate;
