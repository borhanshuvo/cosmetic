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
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { StateContext, UserContext } from "../../../../App";
import config from "../../../../config";

function PremiumBids() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);
  const [bids, setBids] = React.useState([]);

  React.useEffect(() => {
    if (isFocused) {
      fetch(
        `${config.APP_URL}/premiumBidRequest/get/${loggedInUser?.user?.email}`,
        {
          headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        }
      )
        .then((res) => res.json())
        .then((result) => setBids(result));
    }
  }, [loggedInUser?.user?.email, isFocused, state]);

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
              title="Premium Bids"
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
                <BigLotionCard2
                  key={bid._id}
                  title={bid?.product?.title}
                  dis={bid?.product?.description}
                  price={bid?.bidAmmount}
                  backColor={bid?.backColor}
                  orderStatus={bid?.status}
                  userImg={bid?.imgURL}
                  productImg={bid?.product?.imgURL}
                  buttonBackColor="#B7C9D2"
                  buttonWidth={70}
                  ButtontextColor="white"
                  setState={setState}
                  bidType="premiumBid"
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default PremiumBids;

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
