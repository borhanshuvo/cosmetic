import * as React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import config from "../../../config";

function Avatar(props) {
  const { hi, wi, icon, backcolor, img, onPress, image } = props;
  return (
    <View style={style.view1}>
      <View style={{ height: hi, width: wi }}>
        {img && (
          <Image
            source={{ uri: `${config.APP_URL}${img}` }}
            resizeMode="contain"
            resizeMethod="resize"
            style={{ height: "100%", width: "100%", borderRadius: 6 }}
          />
        )}
        <View
          style={{
            width: "100%",
          }}
        >
          <TouchableOpacity onPress={onPress}>
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
              {image !== null ? (
                <Image
                  source={{ uri: image }}
                  resizeMode="contain"
                  resizeMethod="resize"
                  style={{
                    height: "60%",
                    width: "60%",
                  }}
                />
              ) : (
                <Image
                  source={icon}
                  resizeMode="contain"
                  resizeMethod="resize"
                  style={{
                    height: "60%",
                    width: "60%",
                  }}
                />
              )}
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
