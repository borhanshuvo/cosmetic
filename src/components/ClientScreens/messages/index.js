import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Header from "../../atoms/header";
import AppTemplate from "../../ClientTemplate";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import config from "../../../../config";
import { StateContext, UserContext } from "../../../../App";
import MessagesCard2 from "../../orgasms/messagesCard2";

function Messages() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [users, setUsers] = React.useState([]);
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);

  React.useEffect(() => {
    if (isFocused) {
      try {
        fetch(
          `${config.APP_URL}/conversation/getUser/${loggedInUser?.user?._id}`,
          {
            headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
          }
        )
          .then((res) => res.json())
          .then((result) => setUsers(result?.conversation));
      } catch (err) {}
    }
  }, [isFocused, state]);

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
              img3={require("../../../assets/menu1.png")}
            />
          </View>
          <SafeAreaView style={style.container}>
            <ScrollView
              style={style.scrollView}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              {users?.map((user) => (
                <View key={user?._id}>
                  <MessagesCard2
                    id={user?._id}
                    title={user?.participant?.name}
                    dis={user?.participant?.email}
                    img={user?.participant?.image}
                    backColor={user?.participant?.backColor}
                  />
                </View>
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
