import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
} from "react-native";
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { UserContext } from "../../../App";
import config from "../../../config";

function SaveNotificationCard(props) {
  const { title, dis, backColor, img } = props;
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };

  return (
    <MenuProvider skipInstanceCheck={true}>
      <View style={[style.view1, { backgroundColor: backColor }]}>
        <View style={style.view5}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: `${config?.APP_URL}${img}` }}
              resizeMethod="resize"
              resizeMode="contain"
              style={style.image}
            />
            <View style={style.view4}>
              <Text style={{ fontSize: 13, color: "black", opacity: 0.7 }}>
                {title}
              </Text>

              <Text
                style={{
                  fontSize: 6,
                  color: "grey",
                  marginTop: 4,
                  width: "90%",
                }}
              >
                {dis}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </MenuProvider>
  );
}
export default SaveNotificationCard;

const style = StyleSheet.create({
  view1: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    padding: 4,
    paddingTop: 15,
    paddingBottom: 25,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 20,
    justifyContent: "space-between",
  },
  view5: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  view3: {
    width: 70,
    alignItems: "center",
  },
  view4: {
    marginLeft: 16,
    width: "80%",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 8,
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
  dotsImage: {
    height: 15,
    width: 14,
    marginRight: -12,
  },
});
