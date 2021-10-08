import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

// import Home from "../userScreens/Home";
// import Orders from "../userScreens/orders";
// import BidRequest from "../userScreens/bidRequest";
// import Messages from "../userScreens/messages";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Sidebar() {
  const navigation = useNavigation();
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
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
              source={{ uri: loggedInUser?.user?.imgURL }}
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
            onPress={() => navigation.navigate("UserHome")}
          >
            <Text style={style.textLinks}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("UserBidRequest")}
          >
            <Text style={style.textLinks}>My Bids</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("UserCheckOut")}
          >
            <Text style={style.textLinks}>Saved by Me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("UserMessages")}
          >
            <Text style={style.textLinks}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("UserOrders")}
          >
            <Text style={style.textLinks}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("UserNotifications")}
          >
            <Text style={style.textLinks}>Notifications</Text>
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
export default Sidebar;
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
  },
  textLinks: {
    color: "white",
  },
});
