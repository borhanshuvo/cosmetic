import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import config from "../../../config";
import { StateContext, UserContext } from "../../../App";

function ClientTabBar({ item = [], navi }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const nav = useRoute();
  const [total, setTotal] = useState(0);
  const [totalMessage, setTotalMessage] = useState(0);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [state, setState] = useContext(StateContext);

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
        .then((result) => setTotalMessage(result.userTotal));
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
        {totalMessage > 0 ? (
          <>
            {nav?.name === "ClientMessages" ? (
              <Image
                source={require("../../assets/chatgrey.png")}
                resizeMode="contain"
                resizeMethod="resize"
                style={style.iconsStyle}
              />
            ) : (
              <Image
                source={require("../../assets/chatWhiteRed.png")}
                resizeMode="contain"
                resizeMethod="resize"
                style={style.iconsStyle}
              />
            )}
          </>
        ) : (
          <>
            {nav?.name === "ClientMessages" ? (
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
        {total > 0 ? (
          <>
            {nav?.name === "ClientNotifications" ? (
              <Image
                source={require("../../assets/notigrey.png")}
                resizeMode="contain"
                resizeMethod="resize"
                style={style.iconsStyle}
              />
            ) : (
              <Image
                source={require("../../assets/notiWhiteRed.png")}
                resizeMode="contain"
                resizeMethod="resize"
                style={style.iconsStyle}
              />
            )}
          </>
        ) : (
          <>
            {nav?.name === "ClientNotifications" ? (
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
