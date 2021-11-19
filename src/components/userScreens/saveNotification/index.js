import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Header from "../../atoms/header";
import AppTemplate from "../../Usertemplate";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { StateContext, UserContext } from "../../../../App";
import config from "../../../../config";
import SaveNotificationCard from "../../orgasms/saveNotificationCard";

function SaveNotification() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [saveNotifications, setSaveNotifications] = React.useState([]);
  const [state, setState] = React.useContext(StateContext);

  React.useEffect(() => {
    if (isFocused) {
      fetch(
        `${config.APP_URL}/saveNotification/get/${loggedInUser?.user?.email}`,
        {
          headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        }
      )
        .then((res) => res.json())
        .then((result) => setSaveNotifications(result));
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
              title="Save Notification"
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
              {saveNotifications.map((saveNotification) => (
                <SaveNotificationCard
                  key={saveNotification._id}
                  title={saveNotification?.title}
                  dis={saveNotification?.description}
                  backColor="white"
                  img={saveNotification?.imgURL}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default SaveNotification;

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
