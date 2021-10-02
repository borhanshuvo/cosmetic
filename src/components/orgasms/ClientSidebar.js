import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

// import Home from "../userScreens/Home";
// import Orders from "../userScreens/orders";
// import BidRequest from "../userScreens/bidRequest";
// import Messages from "../userScreens/messages";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../App";

function ClientSidebar() {
  const navigation = useNavigation();
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
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
            <TouchableOpacity>
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
            onPress={() => navigation.navigate("ClientBidRequest2")}
          >
            <Text style={style.textLinks}>Bids</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("ClientPremiumRequest")}
          >
            <Text style={style.textLinks}>Premium Request</Text>
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
          {/* <TouchableOpacity
            style={style.viewText}
            onPress={() => navigation.navigate("ClientBuyerProfile")}
          >
            <Text style={style.textLinks}>Profile</Text>
          </TouchableOpacity> */}
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
            <Text style={style.textLinks}>Specail Offer</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <View style={style.view3}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{ color: "#B7C9D2", fontSize: 13 }}
                  onPress={() => {
                    setLoggedInUser({});
                    navigation.navigate("SignUp");
                  }}
                >
                  Sign Out
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/back.png")}
                  resizeMode="cover"
                  resizeMode="contain"
                  style={style.image3}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
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
  },
  textLinks: {
    color: "white",
  },
});
