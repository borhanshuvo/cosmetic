import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import BidRequestCard2 from "../../orgasms/bidRequestCard2";
import Header from "../../atoms/header";
import AppTemplate from "../../ClientTemplate";

function BidRequest2() {
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
              title="Bid Request"
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
              <BidRequestCard2
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste"
                price="$ 29.00"
                backColor="white"
                orderStatus="Accepted"
                buttonBackColor="#B7C9D2"
                buttonWidth={70}
                ButtontextColor="white"
                reject={true}
              />
              <BidRequestCard2
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste"
                price="$ 29.00"
                backColor="white"
                orderStatus="Accepted"
                buttonBackColor="#B7C9D2"
                buttonWidth={70}
                ButtontextColor="white"
                reject={true}
              />
              <BidRequestCard2
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste"
                price="$ 29.00"
                backColor="rgba(255, 255,255, 0.4)"
                orderStatus="Rejected"
                buttonBackColor="#464646"
                buttonWidth={80}
                ButtontextColor="white"
                buttonTextOpacity={0.9}
              />
              <BidRequestCard2
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste"
                price="$ 29.00"
                backColor="rgba(255, 255,255, 0.4)"
                orderStatus="Accepted"
                buttonBackColor="#B7C9D2"
                buttonWidth={70}
                ButtontextColor="white"
                reject={false}
              />

              <BidRequestCard2
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste"
                price="$ 29.00"
                backColor="rgba(255, 255,255, 0.4)"
                orderStatus="Accepted"
                buttonBackColor="#B7C9D2"
                buttonWidth={70}
                ButtontextColor="white"
                reject={true}
                messageShow={true}
                message="helo helo"
              />
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default BidRequest2;

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
