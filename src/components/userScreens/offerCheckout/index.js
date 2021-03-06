import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import CheckOutCard from "../../orgasms/checkOutCard";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Header from "../../atoms/header";
import AppTemplate from "../../Usertemplate";
import config from "../../../../config";
import { StateContext, UserContext } from "../../../../App";

function OfferCheckOut({ route }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { id } = route?.params;
  const [product, setProduct] = useState({});
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);

  useEffect(() => {
    if (isFocused) {
      try {
        fetch(`${config.APP_URL}/specialOffer/get/${id}`, {
          headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        })
          .then((res) => res.json())
          .then((result) => setProduct(result));
      } catch (err) {}
    }
  }, [isFocused, id, state]);

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
              title="Check Out"
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
              <View>
                <CheckOutCard
                  productDetail={product?.product}
                  offerDate={product?.startingDate}
                  id={product?._id}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default OfferCheckOut;

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 0.5,
    borderRadius: 50,
    borderColor: "#B1B9B5",
    paddingLeft: 20,
    width: "100%",
  },
  InputContainer: {
    paddingLeft: 24,
    paddingRight: 24,
  },

  backgroundImage: {
    height: "100%",
  },
  head: {
    marginTop: 20,
    paddingLeft: 24,
    paddingRight: 24,
  },
  container: {
    flex: 1,
  },
  scrollView: { marginTop: 20 },
});
