import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import MessagesCard from "../../orgasms/messagesCard";
import Header from "../../atoms/header";
import AppTemplate from "../../Usertemplate";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import config from "../../../../config";
import { UserContext } from "../../../../App";
function Messages() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [admins, setAdmins] = React.useState([]);

  React.useEffect(() => {
    if (isFocused) {
      fetch(`${config.APP_URL}/user/get/admin`, {
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
      })
        .then((res) => res.json())
        .then((result) => {
          setAdmins(result);
        });
    }
  }, [isFocused]);
  console.log(admins);

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
              title="Messages"
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
              {admins.map((admin) => (
                <MessagesCard
                  key={admin?._id}
                  onPress={() => navigation.navigate("UserInbox")}
                  title={admin?.name}
                  email={admin?.email}
                  dis={admin?.aboutMe}
                  img={admin?.imgURL}
                  backColor="white"
                  dotColor="#B7C9D2"
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default Messages;

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
