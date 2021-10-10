import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../atoms/header";
import AppTemplate from "../../ClientTemplate";
import OrderRequestCard from "../../orgasms/orderRequestCard";

function OrderRequest() {
  const navigation = useNavigation();
  const [orders, setOrders] = React.useState([]);
  const [number, setNumber] = React.useState(0);
  React.useEffect(() => {
    try {
      fetch("https://api-cosmetic.herokuapp.com/order/get")
        .then((res) => res.json())
        .then((result) => setOrders(result));
    } catch (err) {}
  }, [number]);

  return (
    <AppTemplate>
      <View style={{ flex: 1, backgroundColor: "#EBEAEF" }}>
        <ImageBackground
          source={require("../../../assets/Mainbackgound.png")}
          resizeMode="cover"
          style={style.backgroundImage}
        >
          <View style={style.head}>
            <Header
              onPress={() => navigation.goBack()}
              img1={require("../../../assets/arrowLeft2.png")}
              title="Order"
              img2={require("../../../assets/menu2.png")}
              img3={require("../../../assets/loupe.png")}
            />
          </View>
          <SafeAreaView style={style.container}>
            <ScrollView
              style={style.scrollView}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              {orders.map((order) => (
                <OrderRequestCard
                  key={order._id}
                  id={order._id}
                  title={order?.product?.title}
                  dis={order?.product?.description}
                  price={order?.product?.price}
                  backColor="white"
                  orderStatus={order?.status}
                  buttonBackColor="#B7C9D2"
                  buttonWidth={70}
                  ButtontextColor="white"
                  setNumber={setNumber}
                  productImg={order?.product?.imgURL}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default OrderRequest;

const style = StyleSheet.create({
  backgroundImage: {
    height: "100%",
    paddingLeft: 24,
    paddingRight: 24,
  },
  head: {
    marginTop: 20,
  },
  container: {
    flex: 1,
  },
  scrollView: { marginTop: 20 },
});
