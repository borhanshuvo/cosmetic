import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
} from "react-native";
import Stars from "../atoms/stars";
import { useNavigation } from "@react-navigation/native";
import config from "../../../config";
import { StateContext, UserContext } from "../../../App";

function PremiumBidRequestCard({ productDetails }) {
  const navigation = useNavigation();
  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);
  const [bidAmmount, setBidAmmount] = React.useState("");

  const sendPushNotification = async (expoPushToken) => {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: expoPushToken,
        sound: "default",
        title: "Cosmetic",
        body: "New Premium Bid Request!",
      }),
    });
  };

  const handlePlaceBid = () => {
    if (bidAmmount === "") {
      showToast("Enter Bid Price!");
    } else {
      const name = loggedInUser?.user?.name;
      const email = loggedInUser?.user?.email;
      const img = loggedInUser?.user?.avatar;
      const imgURL = loggedInUser?.user?.imgURL;
      const product = {
        title: productDetails?.title,
        description: productDetails?.description,
        img: productDetails?.img,
        imgURL: productDetails?.imgURL,
      };

      fetch(`${config.APP_URL}/premiumBidRequest/post`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${loggedInUser?.accessToken}`,
        },
        body: JSON.stringify({ name, email, img, imgURL, product, bidAmmount }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setBidAmmount("");
            showToast(result.success);
            sendPushNotification(result.adminPushToken);
            setState((prevState) => prevState + 1);
            setTimeout(() => {
              navigation.navigate("UserPremiumBids");
            }, 2000);
          }
        });
    }
  };

  return (
    <View>
      <View style={{ marginBottom: 20 }}>
        <Image
          source={{ uri: `${config.APP_URL}${productDetails?.imgURL}` }}
          style={style.image}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </View>
      <View style={style.main}>
        <Stars />
        <View style={style.line}></View>
        <View style={style.card}>
          <Text style={{ opacity: 0.8 }}>{productDetails?.title}</Text>
          <Text
            style={{ opacity: 0.5, fontSize: 9, width: "90%", marginTop: 5 }}
          >
            {productDetails?.description}
          </Text>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text style={[style.text1.opacity, { fontSize: 13 }]}>
            ${parseFloat(productDetails?.price).toFixed(2)}
          </Text>
        </View>

        <View style={style.inputView}>
          <TextInput
            placeholder="Enter Bid Price"
            value={bidAmmount}
            style={style.input}
            onChangeText={(e) => setBidAmmount(e)}
          />
        </View>

        <TouchableOpacity
          style={{ marginTop: 166 }}
          onPress={() => handlePlaceBid()}
        >
          <View style={style.button}>
            <Text style={{ fontSize: 12, color: "white" }}>Continue</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default PremiumBidRequestCard;

const style = StyleSheet.create({
  main: {
    backgroundColor: "white",
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 11,
  },
  line: {
    height: 1,
    backgroundColor: "#E8E3E3",
    width: "100%",
    marginTop: 14,
    opacity: 0.6,
  },
  card: { marginTop: 10 },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#B7C9D2",
    alignItems: "center",
    borderRadius: 16,
    paddingTop: 17,
    paddingBottom: 17,
    elevation: 1,
  },
  button2: {
    width: "45%",
    display: "flex",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#B7C9D2",
    alignItems: "center",
    borderRadius: 16,
    paddingTop: 17,
    paddingBottom: 17,
  },
  text1: {
    opacity: 0.8,
  },
  image: {
    height: 210,
    width: "100%",
    marginRight: 22,
    marginTop: 10,
  },
  inputView: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#B7C9D2",
    borderRadius: 11,
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "85%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 11,
  },
});
