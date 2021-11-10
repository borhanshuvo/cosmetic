import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { StateContext, UserContext } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../../config";

function ClientSidebar() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);
  const [totalOrder, setTotalOrder] = React.useState(0);
  const [totalBid, setTotalBid] = React.useState(0);
  const [totalPremiumBid, setTotalPremiumBid] = React.useState(0);
  const [totalPremiumUser, setTotalPremiumUser] = React.useState(0);

  React.useEffect(() => {
    if (isFocused) {
      fetch(`${config.APP_URL}/order/pendingOrderStatus`, {
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
      })
        .then((res) => res.json())
        .then((result) => setTotalOrder(result));

      fetch(`${config.APP_URL}/bidRequest/pendingOrderStatus`, {
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
      })
        .then((res) => res.json())
        .then((result) => setTotalBid(result));

      fetch(`${config.APP_URL}/premiumBidRequest/pendingOrderStatus`, {
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
      })
        .then((res) => res.json())
        .then((result) => setTotalPremiumBid(result));

      fetch(`${config.APP_URL}/user/pendingUserStatus`, {
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
      })
        .then((res) => res.json())
        .then((result) => setTotalPremiumUser(result));
    }
  }, [isFocused, state]);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
      setLoggedInUser({});
      navigation.navigate("SignUp");
    } catch (err) {}
  };

  return (
    <View style={style.view1}>
      <View>
        <View style={style.view2}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",

              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: `${config.APP_URL}${loggedInUser?.user?.imgURL}` }}
              style={style.image1}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ color: "white", fontSize: 13 }}>
                {loggedInUser?.user?.name}
              </Text>
              <Text style={{ color: "white", fontSize: 7 }}>
                {loggedInUser?.user?.email}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../../assets/back.png")}
                resizeMode="cover"
                resizeMode="contain"
                style={style.image3}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            paddingLeft: 5,
            paddingTop: 6,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("ClientDashBoard")}
          >
            <Text style={style.textLinks}>DashBoard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("OrderRequest")}
          >
            <Text style={style.textLinks}>Orders</Text>
            {totalOrder > 0 && (
              <Text
                style={{
                  color: "orange",
                  fontSize: 8,
                  lineHeight: 10,
                }}
              >
                o
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("ClientBidRequest2")}
          >
            <Text style={style.textLinks}>Bids</Text>
            {totalBid > 0 && (
              <Text
                style={{
                  color: "orange",
                  fontSize: 8,
                  lineHeight: 10,
                }}
              >
                o
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("ClientPremiumBidRequest2")}
          >
            <Text style={style.textLinks}>Premium Bids</Text>
            {totalPremiumBid > 0 && (
              <Text
                style={{
                  color: "orange",
                  fontSize: 8,
                  lineHeight: 10,
                }}
              >
                o
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("ClientPremiumRequest")}
          >
            <Text style={style.textLinks}>Premium User</Text>
            {totalPremiumUser > 0 && (
              <Text
                style={{
                  color: "orange",
                  fontSize: 8,
                  lineHeight: 10,
                }}
              >
                o
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("ClientStatics")}
          >
            <Text style={style.textLinks}>Statics</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("ClientMessages")}
          >
            <Text style={style.textLinks}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("ClientAddCatogory")}
          >
            <Text style={style.textLinks}>Add Catogory</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("ClientTagClient")}
          >
            <Text style={style.textLinks}>Tag Client</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("ClientSpecailOffer")}
          >
            <Text style={style.textLinks}>Special Offer</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={style.view3}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ marginLeft: 12 }}>
              <TouchableOpacity onPress={() => logout()}>
                <Text style={{ color: "#B7C9D2", fontSize: 13 }}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => logout()}>
              <Image
                source={require("../../assets/back.png")}
                resizeMode="cover"
                resizeMode="contain"
                style={style.image3}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
export default ClientSidebar;
const style = StyleSheet.create({
  view1: {
    flex: 1,
    backgroundColor: "#464646",
    borderTopStartRadius: 40,
    borderBottomStartRadius: 40,
    paddingTop: 20,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  view2: {
    display: "flex",
    flexDirection: "row",
    borderColor: "grey",
    borderBottomWidth: 1,
    paddingBottom: 7,
    alignItems: "center",
    justifyContent: "space-between",
  },
  view3: {
    display: "flex",
    flexDirection: "row",
    borderColor: "grey",
    borderTopWidth: 1,
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image1: {
    height: 35,
    width: 35,
    borderRadius: 5,
  },
  image3: {
    height: 18,
    width: 18,
    borderRadius: 5,
  },
  viewText: {
    marginTop: "8%",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textLinks: {
    color: "white",
  },
});
