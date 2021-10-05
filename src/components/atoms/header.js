import * as React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
function Header(props) {
  const { img1, img2, img3, userImg, title, onPress } = props;
  const navigation = useNavigation();
  return (
    <View style={style.view1}>
      <View style={{ width: "22%" }}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={userImg ? { uri: userImg } : img1}
            style={style.image11}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "56%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={style.title}>{title}</Text>
      </View>

      <View
        style={{
          width: "22%",
          justifyContent: "flex-end",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {/* <Image
          source={img3}
          style={style.image3}
          resizeMethod="resize"
          resizeMode="contain"
        /> */}
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Image
            source={img2}
            style={style.image2}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Header;

const style = StyleSheet.create({
  view1: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
  image11: {
    height: 25,
    width: 25,
    borderRadius: 5,
  },
  image2: { height: 30, width: 30 },
  image3: { height: 20, width: 20, marginRight: 15 },
});
