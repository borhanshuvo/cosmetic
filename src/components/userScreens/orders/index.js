import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import BigLotionCard2 from "../../molecules/bigLotionCard2";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Header from "../../atoms/header";
import AppTemplate from "../../Usertemplate";
import { StateContext, UserContext } from "../../../../App";
import config from "../../../../config";

function Orders() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);
  const email = loggedInUser?.user?.email;
  const [orderList, setOrderList] = React.useState([]);

  React.useEffect(() => {
    if (isFocused) {
      try {
        fetch(`${config.APP_URL}/order/info`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${loggedInUser?.accessToken}`,
          },
          body: JSON.stringify({ email }),
        })
          .then((res) => res.json())
          .then((result) => setOrderList(result));
      } catch (err) {}
    }
  }, [email, isFocused, state]);

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
              title="Orders"
              img2={require("../../../assets/menu2.png")}
              img3={require("../../../assets/menu1.png")}
            />
          </View>
          <SafeAreaView style={style.container}>
            <ScrollView
              style={style.scrollView}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              {orderList.map((ol) => (
                <BigLotionCard2
                  key={ol?._id}
                  title={ol?.product?.title}
                  dis={ol?.product?.description}
                  price={ol?.product?.price}
                  productImg={ol?.product?.imgURL}
                  userImg={ol?.imgURL}
                  backColor="white"
                  orderStatus={ol?.status}
                  buttonBackColor="#B7C9D2"
                  buttonWidth={70}
                  ButtontextColor="white"
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default Orders;

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
