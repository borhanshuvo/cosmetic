import React, { useContext, useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../atoms/header";
import AppTemplate from "../../Usertemplate";
import config from "../../../../config";
import { StateContext, UserContext } from "../../../../App";
import PremiumBidRequestCard from "../../orgasms/premiumBidRequestCard";

function PremiumBidRequest({ route }) {
  const navigation = useNavigation();
  const { id } = route?.params;
  const [product, setProduct] = useState({});
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);

  useEffect(() => {
    try {
      fetch(`${config.APP_URL}/specialOffer/get/${id}`, {
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
      })
        .then((res) => res.json())
        .then((result) => setProduct(result));
    } catch (err) {}
  }, [id, state]);

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
              title="Bid Request"
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
                <PremiumBidRequestCard productDetails={product?.product} />
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default PremiumBidRequest;

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
