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
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Header from "../../atoms/header";
import { TextInput } from "react-native-gesture-handler";
import { io } from "socket.io-client";
import config from "../../../../config";
import { StateContext, UserContext } from "../../../../App";
import * as ImagePicker from "expo-image-picker";

function Inbox({ route }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { id } = route?.params;
  const [socket, setSocket] = React.useState();
  const [clientMessage, setClientMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [sender, setSender] = React.useState({});
  const [receiver, setReceiver] = React.useState({});
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);
  const [image, setImg] = React.useState(null);

  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };

  React.useEffect(() => {
    if (isFocused) {
      fetch(`${config.APP_URL}/conversation/getConversationInfo/${id}`, {
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
      })
        .then((res) => res.json())
        .then((result) => {
          setSender(result?.conversation?.participant);
          setReceiver(result?.conversation?.creator);
        });

      fetch(`${config.APP_URL}/message/get/${id}`, {
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
      })
        .then((res) => res.json())
        .then((result) => setMessages(result?.messages));

      fetch(`${config.APP_URL}/conversation/updateBackColor/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${loggedInUser?.accessToken}`,
        },
        body: JSON.stringify({
          backColor: "#ffffff",
          role: loggedInUser?.user?.role,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          setState((prevState) => prevState + 1);
        });
    }
  }, [id, isFocused, state]);

  React.useEffect(() => {
    const s = io(`${config.APP_URL}`);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [state]);

  socket?.off("new_message").on("new_message", (data) => {
    setMessages([...messages, data]);
  });

  const sendPushNotification = async (token, message) => {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: token,
        sound: "default",
        title: "Cosmetic",
        body: `${message}!`,
      }),
    });
  };

  const PickImage = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!photo.cancelled) {
      setImg(photo.uri);
    }
  };

  const sendMessage = () => {
    if (clientMessage === "") {
      showToast("Please write something!");
    } else {
      const formData = new FormData();
      if (image) {
        const ext = image.substring(image.lastIndexOf(".") + 1);
        const fileName = image.replace(/^.*[\\\/]/, "");
        formData.append("img", {
          name: fileName,
          uri: image,
          type: `image/${ext}`,
        });
      }

      formData.append("text", clientMessage);
      formData.append("sender_name", sender?.name);
      formData.append("sender_email", sender?.email);
      formData.append("sender_id", sender?.id);
      formData.append("sender_image", sender?.image);
      formData.append("sender_backColor", sender?.backColor);
      formData.append("receiver_name", receiver?.name);
      formData.append("receiver_email", receiver?.email);
      formData.append("receiver_id", receiver?.id);
      formData.append("receiver_image", receiver?.image);
      formData.append("receiver_backColor", receiver?.backColor);
      formData.append("conversation_id", id);

      fetch(`${config.APP_URL}/message/send`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${loggedInUser?.accessToken}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          setClientMessage("");
          setImg(null);
          sendPushNotification(result.pushToken, result.messageText);
          fetch(`${config.APP_URL}/conversation/updateBackColor/${id}`, {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${loggedInUser?.accessToken}`,
            },
            body: JSON.stringify({
              backColor: "#E1E9E9",
              role: loggedInUser?.user?.role,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              setState((prevState) => prevState + 1);
            });
        });
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
            img3={require("../../../assets/menu1.png")}
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
                ref={(ref) => {
                  this.scrollView = ref;
                }}
                onContentSizeChange={() =>
                  this.scrollView.scrollToEnd({ animated: true })
                }
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
                    <View key={message._id}>
                      {loggedInUser?.user?._id === message?.sender?.id ? (
                        <InboxMessages
                          messageImage={message?.avatar}
                          dis={message?.text}
                          img={message?.sender?.image}
                          time={message?.createdAt}
                          backColor="rgba(255, 255,255, 0.6)"
                          left={20}
                          justify="flex-end"
                          textDesign={false}
                        />
                      ) : (
                        <InboxMessages
                          messageImage={message?.avatar}
                          dis={message?.text}
                          img={message?.sender?.image}
                          time={message?.createdAt}
                          backColor="white"
                          right={20}
                          textDesign={true}
                        />
                      )}
                    </View>
                  ))}
                  {image && (
                    <Image
                      source={{ uri: image }}
                      resizeMethod="resize"
                      resizeMode="contain"
                      style={{
                        height: 50,
                        width: 50,
                      }}
                    />
                  )}
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
                  paddingRight: 30,
                  paddingLeft: 20,
                  width: "30%",
                }}
              >
                <TouchableOpacity onPress={() => PickImage()}>
                  <Image
                    source={require("../../../assets/attach.png")}
                    resizeMethod="resize"
                    resizeMode="contain"
                    style={style.image}
                  />
                </TouchableOpacity>
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
    height: 20,
    width: 20,
    borderRadius: 8,
  },
});
