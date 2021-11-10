import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { StateContext, UserContext } from "../../../App";
import config from "../../../config";

function PremiumRequestCard(props) {
  const {
    id,
    name,
    email,
    img,
    premium,
    backColor,
    buttonBackColor,
    buttonWidth,
    ButtontextColor,
    buttonTextOpacity,
    setNumber,
    aboutMe,
    role,
  } = props;

  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);

  const sendPushNotification = async (token) => {
    await token?.map((tkn) => {
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
          body: "Premium User!",
        }),
      });
    });
  };

  const updateStatus = (premium) => {
    try {
      fetch(`${config.APP_URL}/user/update/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${loggedInUser?.accessToken}`,
        },
        body: JSON.stringify({ premium }),
      })
        .then((res) => res.json())
        .then((result) => {
          sendPushNotification(result.pushToken);
          setNumber((prevState) => prevState + 1);
          setState((prevState) => prevState + 1);
        });
    } catch (err) {}
  };

  return (
    <>
      {role !== "admin" && (
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
                source={{ uri: `${config.APP_URL}${img}` }}
                resizeMethod="resize"
                resizeMode="contain"
                style={style.image}
              />
              <View style={style.view4}>
                <Text style={{ fontSize: 12, color: "black", opacity: 0.7 }}>
                  {name}
                </Text>

                <Text style={{ fontSize: 6, color: "grey" }}>{email}</Text>
                <Text style={{ fontSize: 6, color: "grey" }}>{aboutMe}</Text>

                {premium === "Pending" && (
                  <View style={{ flexDirection: "row", display: "flex" }}>
                    <TouchableOpacity onPress={() => updateStatus("Premium")}>
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

                    <TouchableOpacity
                      onPress={() => updateStatus("NotPremium")}
                    >
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
                {premium === "Premium" && (
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
                        Premium
                      </Text>
                    </View>
                  </View>
                )}
                {premium === "NotPremium" && (
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
                        Not Premium
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
export default PremiumRequestCard;

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
