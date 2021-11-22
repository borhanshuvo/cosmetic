import * as React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  DrawerActions,
  useNavigation,
  useIsFocused,
} from "@react-navigation/native";
import config from "../../../config";
import { StateContext, UserContext } from "../../../App";
function Header(props) {
  const { img1, img2, img3, userImg, title, onPress } = props;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);
  const [totalOrder, setTotalOrder] = React.useState(0);
  const [totalBid, setTotalBid] = React.useState(0);
  const [totalPremiumBid, setTotalPremiumBid] = React.useState(0);
  const [totalPremiumUser, setTotalPremiumUser] = React.useState(0);
  const [userTotalBid, setUserTotalBid] = React.useState(0);
  const [userTotalPremiumBid, setUserTotalPremiumBid] = React.useState(0);

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

      fetch(
        `${config.APP_URL}/user/getAllNotificationLength/${loggedInUser?.user?.email}`,
        {
          headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        }
      )
        .then((res) => res.json())
        .then((result) => {
          setUserTotalBid(result.totalBid);
          setUserTotalPremiumBid(result.totalPremiumBid);
        });

      return () => {
        setTotalOrder(0);
        setTotalBid(0);
        setTotalPremiumBid(0);
        setTotalPremiumUser(0);
        setUserTotalBid(0);
        setUserTotalPremiumBid(0);
      };
    }
  }, [isFocused, state, loggedInUser?.user?.email]);

  return (
    <View style={style.view1}>
      <View style={{ width: "22%" }}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={userImg ? { uri: `${config.APP_URL}${userImg}` } : img1}
            style={style.image11}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "56%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={style.title}>{title}</Text>
      </View>

      <View
        style={{
          width: "22%",
          justifyContent: "flex-end",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {/* <Image
          source={img3}
          style={style.image3}
          resizeMethod="resize"
          resizeMode="contain"
        /> */}
        {loggedInUser?.user?.role === "admin" ? (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <Image
              source={
                totalOrder > 0 ||
                totalBid > 0 ||
                totalPremiumBid > 0 ||
                totalPremiumUser > 0
                  ? img3
                  : img2
              }
              style={style.image2}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <Image
              source={userTotalBid > 0 || userTotalPremiumBid > 0 ? img3 : img2}
              style={style.image2}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
export default Header;

const style = StyleSheet.create({
  view1: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
  image11: {
    height: 25,
    width: 25,
    borderRadius: 5,
  },
  image2: { height: 30, width: 30 },
  image3: { height: 20, width: 20, marginRight: 15 },
});
