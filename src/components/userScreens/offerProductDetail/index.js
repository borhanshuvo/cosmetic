import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import Header from "../../atoms/header";
import AppTemplate from "../../Usertemplate";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import config from "../../../../config";
import { StateContext, UserContext } from "../../../../App";
import OfferProductDetailCard from "../../orgasms/offerProductDetailCard";

function OfferProductDetail({ route }) {
  const navigation = useNavigation();
  const { id } = route?.params;
  const [product, setProduct] = useState({});
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
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
      <View
        style={{
          flex: 1,
          backgroundColor: "#EBEAEF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            overflow: "hidden",
          }}
        >
          <ImageBackground
            source={require("../../../assets/Mainbackgound.png")}
            resizeMode="cover"
            style={style.backgroundImage}
          >
            <Header
              onPress={() => navigation.goBack()}
              img1={require("../../../assets/arrowLeft2.png")}
              title="Products Detail"
              img2={require("../../../assets/menu2.png")}
              img3={require("../../../assets/menu1.png")}
            />
            <Image
              source={{ uri: `${config.APP_URL}${product?.product?.imgURL}` }}
              style={style.image}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </ImageBackground>
        </View>

        <SafeAreaView style={style.container}>
          <ScrollView
            style={style.scrollView}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{ marginTop: 5 }}>
              <OfferProductDetailCard product={product} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </AppTemplate>
  );
}
export default OfferProductDetail;

const style = StyleSheet.create({
  backgroundImage: {
    height: 300,
    borderRadius: 40,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 22,
    paddingBottom: 22,
    overflow: "hidden",
  },
  image: {
    height: 210,
    width: "100%",
    marginRight: 22,
    marginTop: 10,
  },

  container: {
    flex: 1,
  },
  scrollView: {},
});
