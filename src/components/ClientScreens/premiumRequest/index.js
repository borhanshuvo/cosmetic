import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

import BidRequestCard2 from "../../orgasms/bidRequestCard2";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Header from "../../atoms/header";
import AppTemplate from "../../ClientTemplate";
import PremiumRequestCard from "../../orgasms/premiumRequestCard";
import config from "../../../../config";
import { UserContext } from "../../../../App";

function PremiumRequest() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [users, setUsers] = React.useState([]);
  const [number, setNumber] = React.useState(0);
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);

  React.useEffect(() => {
    if (isFocused) {
      fetch(`${config.APP_URL}/user/get`, {
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }
  }, [number, isFocused]);

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
              title="Premium Request"
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
              {users.map((user) => (
                <PremiumRequestCard
                  key={user._id}
                  id={user._id}
                  name={user?.name}
                  email={user?.email}
                  img={user?.imgURL}
                  premium={user?.premium}
                  backColor="white"
                  buttonBackColor="#B7C9D2"
                  buttonWidth={70}
                  ButtontextColor="white"
                  setNumber={setNumber}
                  aboutMe={user?.aboutMe}
                  role={user?.role}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default PremiumRequest;

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
