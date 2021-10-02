import React from "react";
import { useNavigation } from "@react-navigation/native";

import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
function ClientTabBar({ item = [], navi }) {
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
        onPress={() => navigation.navigate("ClientDashBoard")}
        style={style.icons}
      >
        {nav?.name === "ClientDashBoard" ? (
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
        onPress={() => navigation.navigate("ClientMessages")}
        style={style.icons}
      >
        {nav?.name === "ClientMessages" ? (
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
        onPress={() => navigation.navigate("ClientAddProductDetail")}
      >
        <Image
          source={require("../../assets/plusActive.png")}
          resizeMode="contain"
          resizeMethod="resize"
          style={style.iconsStyle2}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("ClientNotifications")}
      >
        {nav?.name === "ClientNotifications" ? (
          <Image
            source={require("../../assets/notigrey.png")}
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
      <TouchableOpacity
        onPress={() => navigation.navigate("ClientBuyerProfile")}
      >
        {nav?.name === "ClientBuyerProfile" ? (
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
export default ClientTabBar;
const style = StyleSheet.create({
  icons: {},
  iconsStyle: {
    height: 20,
    width: 20,
  },
  iconsStyle2: {
    height: 25,
    width: 25,
  },
});
