import * as React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  ToastAndroid,
} from "react-native";

import Header from "../../atoms/header";
import LotionCard from "../../molecules/lotionCard";
import BigLotionCard from "../../molecules/bigLotionCard";
import AppTemplate from "../../ClientTemplate";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useContext } from "react";
import { StateContext, UserContext } from "../../../../App";
import config from "../../../../config";
import OfferProductCard from "../../molecules/offerProductCard";

function DashBoard() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);
  const [products, setProducts] = React.useState([]);
  const [offerProducts, setOfferProducts] = React.useState([]);
  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };

  React.useEffect(() => {
    if (isFocused) {
      try {
        fetch(`${config.APP_URL}/product/get`, {
          headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        })
          .then((res) => res.json())
          .then((result) => setProducts(result));

        fetch(`${config.APP_URL}/specialOffer/get`, {
          headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        })
          .then((res) => res.json())
          .then((result) => setOfferProducts(result));
      } catch (err) {}
    }
  }, [isFocused, state]);

  const handleProductDelete = (id, endingDate) => {
    if (endingDate) {
      fetch(`${config.APP_URL}/specialOffer/delete/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
      })
        .then((res) => res.json())
        .then((result) => {
          showToast(result.success);
          setTimeout(() => {
            const delPro = offerProducts.filter((pd) => pd._id !== id);
            setOfferProducts(delPro);
            setState((prevState) => prevState + 1);
          }, 2000);
        });
    } else {
      fetch(`${config.APP_URL}/product/delete/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
      })
        .then((res) => res.json())
        .then((result) => {
          showToast(result.success);
          setTimeout(() => {
            const delPro = products.filter((pd) => pd._id !== id);
            setProducts(delPro);
            setState((prevState) => prevState + 1);
          }, 2000);
        });
    }
  };

  return (
    <AppTemplate>
      <View style={{ flex: 1, backgroundColor: "#EBEAEF" }}>
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
              userImg={loggedInUser?.user?.imgURL}
              title="Dashboard"
              img2={require("../../../assets/menu2.png")}
              img3={require("../../../assets/menu1.png")}
            />

            <Text style={{ fontSize: 12, paddingBottom: 4, marginTop: 50 }}>
              Skin Care
            </Text>
          </ImageBackground>
        </View>

        <SafeAreaView style={style.container}>
          <ScrollView
            style={style.scrollView}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <Text style={style.text2}>Auction</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ width: "100%", marginTop: 10 }}
              data={offerProducts}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <OfferProductCard
                  onPress={() =>
                    navigation.navigate("ClientEditOfferProductDetail", {
                      id: item?._id,
                    })
                  }
                  id={item?._id}
                  title={item?.product?.title}
                  dis={item?.product?.description}
                  price={item?.product?.price}
                  bid={item?.product?.bid}
                  img={item?.product?.imgURL}
                  endingDate={item?.endingDate}
                  quantity={item?.product?.quantity}
                  handleProductDelete={handleProductDelete}
                  color="#ffffff"
                />
              )}
            />
            <Text style={style.text2}>Tranding</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ width: "100%", marginTop: 10 }}
              data={products}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <BigLotionCard
                  onPress={() =>
                    navigation.navigate("ClientEditProductDetail", {
                      id: item?._id,
                    })
                  }
                  title={item?.title}
                  dis={item?.description}
                  price={item?.price}
                  img={item?.imgURL}
                  quantity={item?.quantity}
                  color="white"
                />
              )}
            />
            <Text style={style.text2}>Regular Products</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ width: "100%", marginTop: 10 }}
              data={products}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <LotionCard
                  onPress={() =>
                    navigation.navigate("ClientEditProductDetail", {
                      id: item?._id,
                    })
                  }
                  id={item?._id}
                  title={item?.title}
                  dis={item?.description}
                  price={item?.price}
                  img={item?.imgURL}
                  quantity={item?.quantity}
                  handleProductDelete={handleProductDelete}
                />
              )}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </AppTemplate>
  );
}
export default DashBoard;

const style = StyleSheet.create({
  backgroundImage: {
    height: 170,

    borderBottomStartRadius: 40,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 22,
    paddingBottom: 22,
    overflow: "hidden",
  },
  view2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
  },
  scrollView: {},
  text2: {
    color: "black",
    fontSize: 12,
    marginLeft: 8,
    marginTop: 14,
    opacity: 0.7,
  },
});
