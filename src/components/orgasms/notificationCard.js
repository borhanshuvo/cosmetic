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
import config from "../../../config";
function MessagesCard(props) {
  const { title, dis, dotColor, backColor, toggle, img, id, email, setNumber } =
    props;
  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };
  const deleteProduct = (id) => {
    fetch(`https://api-cosmetic.herokuapp.com/user/deleteNotification/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          showToast(data.error);
        } else {
          showToast(data.success);
          setNumber((prevState) => prevState + 1);
        }
      });
  };
  const saveProduct = (id) => {};
  return (
    <MenuProvider skipInstanceCheck={true}>
      <View style={[style.view1, { backgroundColor: backColor }]}>
        <View style={style.view5}>
          <View style={style.viewtop}>
            <View></View>

            {toggle === true ? (
              <View style={style.dotsImage}>
                <Menu style={{ width: 40 }}>
                  <MenuTrigger>
                    <View>
                      <Image
                        resizeMethod="resize"
                        resizeMode="contain"
                        source={require("../../assets/menuDots.png")}
                        style={{ height: 16, width: 16 }}
                      />
                    </View>
                  </MenuTrigger>
                  <MenuOptions style={{ backgroundColor: "transparent" }}>
                    <View style={{ backgroundColor: "white" }}>
                      <TouchableOpacity onPress={() => deleteProduct(id)}>
                        <Text style={{ marginTop: 5, marginLeft: 5 }}>
                          DELETE
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => saveProduct(id)}>
                        <Text style={{ marginTop: 5, marginLeft: 5 }}>
                          SAVE
                        </Text>
                      </TouchableOpacity>
                      <MenuOption />
                    </View>
                  </MenuOptions>
                </Menu>
              </View>
            ) : (
              <View style={[style.dot, { backgroundColor: dotColor }]}></View>
            )}
          </View>
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
export default MessagesCard;

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
