import * as React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";

import Header from "../../atoms/header";
import LotionCard from "../../molecules/lotionCard";
import BigLotionCard from "../../molecules/bigLotionCard";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { UserContext } from "../../../../App";
import AppTemplate from "../../Usertemplate";
import config from "../../../../config";

function Home() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [products, setProducts] = React.useState([]);
  const [offerProducts, setOfferProducts] = React.useState([]);
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    if (isFocused) {
      fetch(`${config.APP_URL}/user/get/${loggedInUser?.user?._id}`)
        .then((res) => res.json())
        .then((data) => setUser(data.user[0]));

      fetch(`${config.APP_URL}/product/get`)
        .then((res) => res.json())
        .then((result) => setProducts(result));

      fetch(`${config.APP_URL}/specialOffer/get`)
        .then((res) => res.json())
        .then((result) => setOfferProducts(result));
    }
  }, [loggedInUser?.user?._id, isFocused]);

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
              title="Products"
              img2={require("../../../assets/menu2.png")}
              img3={require("../../../assets/loupe.png")}
            />
            <View style={{ marginTop: 24 }}>
              <View style={style.view2}>
                <Text style={{ fontSize: 35, fontWeight: "normal" }}>Body</Text>
                <Text style={{ fontSize: 12, paddingBottom: 4 }}>Care</Text>
              </View>
              <Text style={{ fontSize: 35, marginTop: -18, marginLeft: 20 }}>
                Cosmetics
              </Text>
            </View>
            <Text style={{ fontSize: 12, paddingBottom: 4, marginTop: 40 }}>
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
            {user?.premium === "Premium" && (
              <>
                <Text style={style.text2}>Offer</Text>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={{ width: "100%", marginTop: 10 }}
                  data={offerProducts}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <LotionCard
                      ButtonClick={() =>
                        navigation.navigate("UserCheckOut", {
                          id: item?.product?._id,
                        })
                      }
                      onPress={() =>
                        navigation.navigate("UserProductDetail", {
                          id: item?.product?._id,
                        })
                      }
                      title={item?.product?.title}
                      dis={item?.product?.description}
                      price={item?.product?.price}
                      img={item?.product?.imgURL}
                    />
                  )}
                />
              </>
            )}
            <Text style={style.text2}>Popular</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ width: "100%", marginTop: 10 }}
              data={products}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <BigLotionCard
                  onPress={() =>
                    navigation.navigate("UserProductDetail", { id: item?._id })
                  }
                  title={item?.title}
                  dis={item?.description}
                  price={item?.price}
                  img={item?.imgURL}
                  color="white"
                />
              )}
            />
            <Text style={style.text2}>
              Newest ({products?.length} Products)
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ width: "100%", marginTop: 10 }}
              data={products}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <LotionCard
                  ButtonClick={() =>
                    navigation.navigate("UserCheckOut", { id: item?._id })
                  }
                  onPress={() =>
                    navigation.navigate("UserProductDetail", { id: item?._id })
                  }
                  title={item?.title}
                  dis={item?.description}
                  price={item?.price}
                  img={item?.imgURL}
                />
              )}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </AppTemplate>
  );
}
export default Home;

const style = StyleSheet.create({
  backgroundImage: {
    height: 250,

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

  text2: {
    color: "black",
    fontSize: 12,
    marginLeft: 8,
    marginTop: 5,
    opacity: 0.7,
  },
});
