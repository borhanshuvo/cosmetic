import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { UserContext } from "../../../App";
import config from "../../../config";

function OrderRequestCard(props) {
  const {
    id,
    title,
    dis,
    price,
    backColor,
    orderStatus,
    buttonBackColor,
    buttonWidth,
    ButtontextColor,
    buttonTextOpacity,
    setNumber,
    productImg,
  } = props;
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);

  const sendPushNotification = async (token) => {
    await token.map((tkn) => {
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: tkn.pushToken,
          sound: "default",
          title: "Cosmetic",
          body: "New Notification! Order Request!",
        }),
      });
    });
  };

  const updateStatus = (status) => {
    try {
      fetch(`${config.APP_URL}/order/update/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${loggedInUser?.accessToken}`,
        },
        body: JSON.stringify({ status }),
      })
        .then((res) => res.json())
        .then((result) => {
          sendPushNotification(result.pushToken);
          setNumber((prevState) => prevState + 1);
        });
    } catch (err) {}
  };

  return (
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
            source={{ uri: `${config.APP_URL}${productImg}` }}
            resizeMethod="resize"
            resizeMode="contain"
            style={style.image}
          />
          <View style={style.view4}>
            <Text style={{ fontSize: 12, color: "black", opacity: 0.7 }}>
              {title}
            </Text>

            <Text style={{ fontSize: 6, color: "grey" }}>{dis}</Text>

            {orderStatus === "Pending" && (
              <View style={{ flexDirection: "row", display: "flex" }}>
                <TouchableOpacity onPress={() => updateStatus("Deliverd")}>
                  <View
                    style={{
                      backgroundColor: buttonBackColor,
                      width: buttonWidth,
                      alignItems: "center",
                      paddingTop: 4,
                      paddingBottom: 4,
                      borderRadius: 6,
                      marginTop: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: ButtontextColor,
                        opacity: buttonTextOpacity,
                      }}
                    >
                      Accept
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => updateStatus("Rejected")}>
                  <View
                    style={{
                      width: buttonWidth,
                      alignItems: "center",
                      paddingTop: 4,
                      paddingBottom: 4,
                      borderRadius: 6,
                      marginTop: 4,
                      marginLeft: 10,
                      borderColor: "black",
                      borderWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: "black",
                        opacity: 0.6,
                      }}
                    >
                      Reject
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {orderStatus === "Deliverd" && (
              <View style={{ flexDirection: "row", display: "flex" }}>
                <View
                  style={{
                    backgroundColor: buttonBackColor,
                    width: buttonWidth,
                    alignItems: "center",
                    paddingTop: 4,
                    paddingBottom: 4,
                    borderRadius: 6,
                    marginTop: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: ButtontextColor,
                      opacity: buttonTextOpacity,
                    }}
                  >
                    Deliverd
                  </Text>
                </View>
              </View>
            )}
            {orderStatus === "Rejected" && (
              <View style={{ flexDirection: "row", display: "flex" }}>
                <View
                  style={{
                    width: buttonWidth,
                    alignItems: "center",
                    paddingTop: 4,
                    paddingBottom: 4,
                    borderRadius: 6,
                    marginTop: 4,
                    marginLeft: 0,
                    backgroundColor: "#464646",
                    borderWidth: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",
                    }}
                  >
                    Rejected
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={style.view3}>
        <Text style={style.priceStyle}>${parseFloat(price).toFixed(2)}</Text>
      </View>
    </View>
  );
}
export default OrderRequestCard;

const style = StyleSheet.create({
  view1: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    padding: 4,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 20,
    justifyContent: "space-between",
  },
  view5: {
    width: 185,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  view3: {
    width: 70,
    alignItems: "center",
    marginBottom: 10,
  },
  view4: {
    marginLeft: 5,
  },
  image: {
    height: 57,
    width: 57,
  },
  image1: {
    height: 26,
    width: 26,
    marginTop: 6,
    borderRadius: 10,
  },
  priceStyle: {
    fontSize: 9,
    color: "black",
    opacity: 0.7,
    marginBottom: 30,
  },
  messageStyle: {
    width: 175,
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 6,
    marginTop: 4,
    borderColor: "black",
    backgroundColor: "white",
    marginBottom: 4,
  },
});
