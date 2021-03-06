import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Header from "../../atoms/header";
import AppTemplate from "../../ClientTemplate";
import config from "../../../../config";
import { StateContext, UserContext } from "../../../../App";
import PremiumBidRequestCard2 from "../../orgasms/premiumBidRequestCard2";

function PremiumBidRequest2() {
  const navigation = useNavigation();
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);
  const [bids, setBids] = React.useState([]);
  const [number, setNumber] = React.useState(0);
  const isFocused = useIsFocused();
  
  React.useEffect(() => {
    if(isFocused) {
      try {
        fetch(`${config.APP_URL}/premiumBidRequest/get`, {
          headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        })
          .then((res) => res.json())
          .then((result) => setBids(result));
      } catch (err) {}
    }
  }, [number, isFocused, state]);

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
              title="Premium Bid Request"
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
              {bids.map((bid) => (
                <PremiumBidRequestCard2
                  key={bid._id}
                  id={bid._id}
                  title={bid?.product?.title}
                  dis={bid?.product?.description}
                  price={bid?.bidAmmount}
                  backColor="white"
                  orderStatus={bid?.status}
                  buttonBackColor="#B7C9D2"
                  buttonWidth={70}
                  ButtontextColor="white"
                  productImg={bid?.product?.imgURL}
                  setNumber={setNumber}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default PremiumBidRequest2;

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
