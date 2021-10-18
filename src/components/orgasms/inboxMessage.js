import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import config from "../../../config";
import moment from "moment";

function InboxMessages(props) {
  const {
    title,
    dis,
    dotColor,
    backColor,
    onPress,
    left,
    right,
    justify,
    img,
    time,
    textDesign,
  } = props;
  return (
    <View>
      <TouchableOpacity
        style={[
          style.view1,
          {
            backgroundColor: backColor,
            borderBottomRightRadius: right,
            borderBottomLeftRadius: left,
            alignSelf: justify,
          },
        ]}
        onPress={onPress}
      >
        <View style={style.view5}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "20%",
            }}
          >
            <Image
              source={{ uri: `${config.APP_URL}${img}` }}
              resizeMethod="resize"
              resizeMode="contain"
              style={style.image}
            />
          </View>
          <View style={style.view4}>
            <Text
              style={{
                fontSize: 11,
                color: "grey",
                marginTop: 4,
                width: "90%",
              }}
            >
              {dis}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Text
        style={{
          textAlign: `${textDesign ? "left" : "right"}`,
          fontSize: 8,
          color: "rgba(0, 0, 255, 0.6)",
        }}
      >
        {moment(time).fromNow()}
      </Text>
    </View>
  );
}
export default InboxMessages;

const style = StyleSheet.create({
  view1: {
    width: "88%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    padding: 4,
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: "space-between",
  },
  view5: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  view3: {
    width: 70,

    alignItems: "center",
  },
  view4: {
    marginLeft: 4,
    width: "80%",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  viewtop: {
    height: 10,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  dot: {
    height: 10,
    width: 10,

    borderRadius: 100,
    marginRight: -12,
  },
});
