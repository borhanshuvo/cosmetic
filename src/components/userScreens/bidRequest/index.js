import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import BigLotionCard2 from "../../molecules/bigLotionCard2";

import Header from "../../atoms/header";
import AppTemplate from "../../Usertemplate";
import { useNavigation } from "@react-navigation/native";

function BidRequest() {
  const navigation = useNavigation();

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
              title="Bid Requests"
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
              <BigLotionCard2
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste"
                price="$ 29.00"
                backColor="white"
                orderStatus="Approved"
                buttonBackColor="#B7C9D2"
                buttonWidth={70}
                ButtontextColor="white"
              />
              <BigLotionCard2
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste"
                price="$ 29.00"
                backColor="white"
                orderStatus="Approved"
                buttonBackColor="#B7C9D2"
                buttonWidth={70}
                ButtontextColor="white"
              />
              <BigLotionCard2
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste"
                price="$ 29.00"
                backColor="rgba(255, 255,255, 0.4)"
                orderStatus="Not Approve"
                buttonBackColor="#464646"
                buttonWidth={80}
                ButtontextColor="white"
                buttonTextOpacity={0.9}
              />
              <BigLotionCard2
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste"
                price="$ 29.00"
                backColor="rgba(255, 255,255, 0.4)"
                orderStatus="Seller Sent Different Bid"
                buttonBackColor="white"
                buttonWidth={150}
                ButtontextColor="black"
                buttonTextOpacity={0.6}
              />
              <BigLotionCard2
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste"
                price="$ 29.00"
                backColor="rgba(255, 255,255, 0.4)"
                orderStatus="Delivered"
                buttonBackColor="#B7C9D2"
                buttonWidth={70}
                ButtontextColor="white"
              />
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default BidRequest;

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
