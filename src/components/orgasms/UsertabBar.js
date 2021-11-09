import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { StateContext, UserContext } from "../../../App";
import config from "../../../config";

function TabBar({ item = [], navi }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [total, setTotal] = useState(0);
  const [totalMessage, setTotalMessage] = useState(0);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [state, setState] = useContext(StateContext);
  const nav = useRoute();

  useEffect(() => {
    if (isFocused) {
      const email = loggedInUser.user.email;
      fetch(`${config.APP_URL}/user/unseenNotification`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${loggedInUser?.accessToken}`,
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTotal(data);
        });

      fetch(
        `${config.APP_URL}/conversation/getUser/${loggedInUser?.user?._id}`,
        {
          headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        }
      )
        .then((res) => res.json())
        .then((result) => setTotalMessage(result.adminTotal));
    }
  }, [isFocused, state]);

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
        {totalMessage > 0 ? (
          <Image
            source={require("../../assets/chatgrey.png")}
            resizeMode="contain"
            resizeMethod="resize"
            style={style.iconsStyle}
          />
        ) : (
          <>
            {nav?.name === "UserMessages" ? (
              <Image
                source={require("../../assets/chatActive.png")}
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
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("UserNotifications")}
      >
        {total > 0 ? (
          <Image
            source={require("../../assets/notigrey.png")}
            resizeMode="contain"
            resizeMethod="resize"
            style={style.iconsStyle}
          />
        ) : (
          <>
            {nav?.name === "UserNotifications" ? (
              <Image
                source={require("../../assets/notiActive.png")}
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
          </>
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
