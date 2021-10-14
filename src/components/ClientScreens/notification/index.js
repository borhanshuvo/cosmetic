import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import NotificationCard from "../../orgasms/notificationCard";
import Header from "../../atoms/header";
import AppTemplate from "../../ClientTemplate";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../../App";
import config from "../../../../config";

function Notifications() {
  const navigation = useNavigation();
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [notification, setNotification] = React.useState([]);
  const [number, setNumber] = React.useState(0);
  React.useEffect(() => {
    const email = loggedInUser.user.email;
    fetch(`${config.APP_URL}/user/getUserNotification`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${loggedInUser?.accessToken}`,
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => setNotification(data));
  }, [number]);
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
              title="Notification"
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
              {notification.map((nt) => (
                <NotificationCard
                  key={nt?._id}
                  id={nt?._id}
                  title={nt?.title}
                  dis={nt?.description}
                  img={nt?.imgURL}
                  email={loggedInUser?.user?.email}
                  setNumber={setNumber}
                  backColor="white"
                  dotColor="#B7C9D2"
                  toggle={true}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default Notifications;

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
