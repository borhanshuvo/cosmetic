import * as React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

function Avatar(props) {
  const { hi, wi, icon, backcolor } = props;
  return (
    <View style={style.view1}>
      <View style={{ height: hi, width: wi }}>
        <Image
          source={require("../../assets/icon.png")}
          resizeMode="contain"
          resizeMethod="resize"
          style={{ height: "100%", width: "100%", borderRadius: 6 }}
        />

        <View
          style={{
            width: "100%",
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: backcolor,
                alignSelf: "flex-end",
                borderRadius: 6,
                marginTop: -16,
                marginRight: -10,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Image
                source={icon}
                resizeMode="contain"
                resizeMethod="resize"
                style={{
                  height: "60%",
                  width: "60%",
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default Avatar;

const style = StyleSheet.create({
  view1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  view2: {},
});
