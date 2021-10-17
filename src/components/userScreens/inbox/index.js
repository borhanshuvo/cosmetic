import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import InboxMessages from "../../orgasms/inboxMessage";
import { useNavigation } from "@react-navigation/native";
import Header from "../../atoms/header";
import { TextInput } from "react-native-gesture-handler";
import { io } from "socket.io-client";
import config from "../../../../config";
import { UserContext } from "../../../../App";

function Inbox({ route }) {
  const navigation = useNavigation();
  const { id } = route?.params;
  const [socket, setSocket] = React.useState();
  const [clientMessage, setClientMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [sender, setSender] = React.useState({});
  const [receiver, setReceiver] = React.useState({});
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };

  React.useEffect(() => {
    fetch(`${config.APP_URL}/conversation/getConversationInfo/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setSender(result?.conversation?.participant);
        setReceiver(result?.conversation?.creator);
      });

    fetch(`${config.APP_URL}/message/get/${id}`)
      .then((res) => res.json())
      .then((result) => setMessages(result?.messages));
  }, [id]);

  React.useEffect(() => {
    const s = io(`${config.APP_URL}`);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  socket?.off("new_message").on("new_message", (data) => {
    setMessages([...messages, data]);
  });

  const sendMessage = () => {
    if (clientMessage === "") {
      showToast("Please write something!");
    } else {
      fetch(`${config.APP_URL}/message/send`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          text: clientMessage,
          sender,
          receiver,
          conversation_id: id,
        }),
      })
        .then((res) => res.json())
        .then((result) => console.log(result));
    }
  };
  return (
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
            title="Chat"
            img2={require("../../../assets/menu2.png")}
            img3={require("../../../assets/loupe.png")}
          />
        </View>
        <View
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View style={{ height: "84%", display: "flex" }}>
            <SafeAreaView style={style.container}>
              <ScrollView
                style={style.scrollView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "flex-end",
                  flexDirection: "column",
                  paddingBottom: 20,
                }}
              >
                <View
                  style={{
                    paddingLeft: 24,
                    paddingRight: 24,
                  }}
                >
                  {messages.map((message) => (
                    <View>
                      {loggedInUser?.user?._id === message?.sender?.id ? (
                        <InboxMessages
                          dis={message?.text}
                          backColor="rgba(255, 255,255, 0.4)"
                          left={20}
                          justify="flex-end"
                        />
                      ) : (
                        <InboxMessages
                          dis={message?.text}
                          backColor="white"
                          right={20}
                        />
                      )}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </SafeAreaView>
          </View>
          <View style={{ backgroundColor: "#464646", height: "16%" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder="Type Something..."
                value={clientMessage}
                onChangeText={(e) => setClientMessage(e)}
                style={{
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 13,
                  paddingBottom: 13,
                  color: "#AEAEAE",

                  width: "70%",
                }}
                placeholderTextColor="#AEAEAE"
              />
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",

                  paddingRight: 15,
                  paddingLeft: 10,
                  width: "30%",
                }}
              >
                {/* <Image
                  source={require("../../../assets/smile.png")}
                  style={style.image}
                />
                <Image
                  source={require("../../../assets/attach.png")}
                  style={style.image}
                /> */}
                <TouchableOpacity onPress={() => sendMessage()}>
                  <Image
                    source={require("../../../assets/send.png")}
                    style={style.image}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
export default Inbox;

const style = StyleSheet.create({
  backgroundImage: {
    height: "100%",
  },
  head: {
    marginTop: 20,
    paddingLeft: 24,
    paddingRight: 24,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    marginTop: 20,

    display: "flex",
  },
  image: {
    marginLeft: 50,
    height: 20,
    width: 20,
    borderRadius: 8,
  },
});
