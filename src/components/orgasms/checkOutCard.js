import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Modal,
} from "react-native";
import { WebView } from "react-native-webview";
import { UserContext } from "../../../App";
import CounterCheckOut from "../molecules/counterCheckOut";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import config from "../../../config";

function CheckOutCard({ productDetail, offerDate, id }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [quantity, setquantity] = React.useState(1);
  const price = productDetail?.price;
  const totalAmount = quantity * price;
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [streetAddress, setStreetAddress] = React.useState("");
  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };
  const [payment, setPayment] = React.useState({
    showModal: false,
  });

  React.useEffect(() => {
    if (isFocused) {
      setquantity(1);
    }
  }, [isFocused]);

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
        body: "New Order Added!",
      }),
    });
  };

  const handleResponse = (data) => {
    if (data.title === "success") {
      setPayment({ showModal: false });
      const name = loggedInUser?.user?.name;
      const email = loggedInUser?.user?.email;
      const img = loggedInUser?.user?.avatar;
      const imgURL = loggedInUser?.user?.imgURL;
      const product = {
        img: productDetail?.img,
        imgURL: productDetail?.imgURL,
        title: productDetail?.title,
        description: productDetail?.description,
        quantity: quantity,
        price: totalAmount,
      };
      try {
        fetch(`${config.APP_URL}/order/post`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${loggedInUser?.accessToken}`,
          },
          body: JSON.stringify({
            name,
            email,
            img,
            imgURL,
            address,
            streetAddress,
            city,
            phone,
            product,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.error) {
              showToast(result.error);
            } else {
              sendPushNotification(result.adminPushToken);
              const currentQuantity = `${
                parseInt(productDetail?.quantity) - quantity
              }`;
              if (offerDate) {
                const formData = new FormData();
                formData.append("product.quantity", currentQuantity);
                fetch(`${config.APP_URL}/specialOffer/update/${id}`, {
                  method: "PUT",
                  headers: {
                    authorization: `Bearer ${loggedInUser?.accessToken}`,
                  },
                  body: formData,
                })
                  .then((res) => res.json())
                  .then((result) => {});
              } else {
                fetch(
                  `${config.APP_URL}/product/update/${productDetail?._id}`,
                  {
                    method: "PUT",
                    headers: {
                      "content-type": "application/json",
                      authorization: `Bearer ${loggedInUser?.accessToken}`,
                    },
                    body: JSON.stringify({ quantity: currentQuantity }),
                  }
                )
                  .then((res) => res.json())
                  .then((result) => {});
              }
              setAddress("");
              setStreetAddress("");
              setPhone("");
              setCity("");
              setquantity(1);
              showToast(result.success);
              setTimeout(() => {
                navigation.navigate("UserOrders");
              }, 2000);
            }
          });
      } catch (err) {
        showToast("Something wrong!");
      }
    } else if (data.title === "cancel") {
      setPayment({ showModal: false });
    } else {
      return;
    }
  };

  const orderSubmit = () => {
    if (address === "") {
      showToast("Enter Your Address");
    } else if (streetAddress === "") {
      showToast("Enter Your Street Address");
    } else if (city === "") {
      showToast("Enter Your City");
    } else if (phone === "") {
      showToast("Enter Your Phone Number");
    } else if (isNaN(phone)) {
      showToast("Phone Number only numeric!");
    } else {
      setPayment({ showModal: true });
    }
  };

  return (
    <View>
      <View style={style.InputContainer}>
        <View style={style.inputView}>
          <TextInput
            placeholder="Address"
            value={address}
            style={style.input}
            onChangeText={(e) => setAddress(e)}
          />
        </View>
        <View style={style.inputView}>
          <TextInput
            placeholder="Street Address"
            value={streetAddress}
            style={style.input}
            onChangeText={(e) => setStreetAddress(e)}
          />
        </View>
        <View style={style.inputView}>
          <TextInput
            placeholder="City"
            value={city}
            style={style.input}
            onChangeText={(e) => setCity(e)}
          />
        </View>
        <View style={style.inputView}>
          <TextInput
            placeholder="Phone Number"
            value={phone}
            style={style.input}
            onChangeText={(e) => setPhone(e)}
          />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={style.main}>
          <View style={style.view1}>
            <Text style={style.text1}>
              Quantity ({productDetail?.quantity})
            </Text>
            <Text style={style.text1}>
              {parseInt(productDetail?.quantity) !== 0
                ? parseInt(productDetail?.quantity) - quantity
                : 0}
            </Text>
          </View>
          <View style={style.line}></View>
          <View style={style.card}></View>
          <View style={{ marginTop: 10 }}>
            <CounterCheckOut
              value={productDetail?.title}
              productQuantity={productDetail?.quantity}
              quantity={quantity}
              setquantity={setquantity}
              price={productDetail?.price}
            />
          </View>
          <View style={style.buttons}>
            <Text style={{ fontSize: 13, color: "black" }}>Total Amount</Text>
            <View style={style.button2}>
              <Text style={{ fontSize: 15, color: "black", opacity: 0.6 }}>
                ${parseFloat(totalAmount).toFixed(2)}
              </Text>
            </View>
          </View>
          <Modal
            visible={payment.showModal}
            onRequestClose={() => setPayment({ showModal: false })}
          >
            <WebView
              source={{
                uri: `${config.APP_URL}/order/payment`,
                method: "POST",
                body: `title=${productDetail?.title}&quantity=${quantity}&totalAmount=${totalAmount}&price=${productDetail?.price}`,
              }}
              onNavigationStateChange={(data) => handleResponse(data)}
            />
          </Modal>
          <TouchableOpacity
          style={{marginTop: 130}}
            disabled={parseInt(productDetail?.quantity) === 0 ? true : false}
            onPress={() => {
              orderSubmit();
            }}
          >
            <View style={style.button}>
              {parseInt(productDetail?.quantity) === 0 ? (
                <Text style={{ fontSize: 15, color: "white" }}>
                  Out of Stock
                </Text>
              ) : (
                <Text style={{ fontSize: 15, color: "white" }}>Check Out</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default CheckOutCard;

const style = StyleSheet.create({
  main: {
    backgroundColor: "white",
    borderTopEndRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 25,
    paddingLeft: 22,
    paddingRight: 22,
    paddingBottom: 25,
  },
  view1: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginTop: 18,
  },
  button: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#B7C9D2",
    alignItems: "center",
    borderRadius: 16,
    paddingTop: 14,
    paddingBottom: 14,
    elevation: 1,
    marginTop: 10,
  },
  button2: {
    width: "45%",
    display: "flex",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#B7C9D2",
    alignItems: "center",
    borderRadius: 16,
    paddingTop: 14,
    paddingBottom: 14,
  },
  text1: {
    fontSize: 13,
    color: "black",
    opacity: 0.8,
  },
  InputContainer: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  inputView: {
    backgroundColor: "white",
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
