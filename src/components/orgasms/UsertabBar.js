import React from "react";
import { useNavigation } from "@react-navigation/native";

import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
function TabBar({ item = [], navi }) {
  const navigation = useNavigation();
  const nav = useRoute();
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("UserHome")}
        style={style.icons}
      >
        {nav?.name === "UserHome" ? (
          <Image
            source={require("../../assets/homegrey.png")}
            resizeMode="contain"
            resizeMethod="resize"
            style={style.iconsStyle}
          />
        ) : (
          <Image
            source={require("../../assets/homeWhite.png")}
            resizeMode="contain"
            resizeMethod="resize"
            style={style.iconsStyle}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("UserMessages")}
        style={style.icons}
      >
        {nav?.name === "UserMessages" ? (
          <Image
            source={require("../../assets/chatgrey.png")}
            resizeMode="contain"
            resizeMethod="resize"
            style={style.iconsStyle}
          />
        ) : (
          <Image
            source={require("../../assets/chatWhite.png")}
            resizeMode="contain"
            resizeMethod="resize"
            style={style.iconsStyle}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("UserNotifications")}
      >
        {nav?.name === "UserNotifications" ? (
          <Image
            source={require("../../assets/notiWhite.png")}
            resizeMode="contain"
            resizeMethod="resize"
            style={style.iconsStyle}
          />
        ) : (
          <Image
            source={require("../../assets/notiWhite.png")}
            resizeMode="contain"
            resizeMethod="resize"
            style={style.iconsStyle}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("UserEditProfile")}>
        {nav?.name === "UserEditProfile" ? (
          <Image
            source={require("../../assets/persongrey.png")}
            resizeMode="contain"
            resizeMethod="resize"
            style={style.iconsStyle}
          />
        ) : (
          <Image
            source={require("../../assets/personWhite.png")}
            resizeMode="contain"
            resizeMethod="resize"
            style={style.iconsStyle}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
export default TabBar;
const style = StyleSheet.create({
  icons: {},
  iconsStyle: {
    height: 20,
    width: 20,
  },
});
