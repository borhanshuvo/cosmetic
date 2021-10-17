import * as React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import InboxMessages from "../../orgasms/inboxMessage";
import { useNavigation } from "@react-navigation/native";
import Header from "../../atoms/header";
import { TextInput } from "react-native-gesture-handler";

function ClientInbox() {
  const navigation = useNavigation();
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
                  <InboxMessages
                    dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                    Perspiciatis unde omnis iste...              "
                    backColor="white"
                    right={20}
                  />
                  <InboxMessages
                    dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                    Perspiciatis unde omnis iste...              "
                    backColor="rgba(255, 255,255, 0.4)"
                    left={20}
                    justify="flex-end"
                  />
                  <InboxMessages
                    dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                    Perspiciatis unde omnis iste...              "
                    backColor="white"
                    right={20}
                  />
                  <InboxMessages
                    dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                    Perspiciatis unde omnis iste...              "
                    backColor="rgba(255, 255,255, 0.4)"
                    left={20}
                    justify="flex-end"
                  />
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
                <Image
                  source={require("../../../assets/smile.png")}
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={style.image}
                />
                <Image
                  source={require("../../../assets/attach.png")}
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={style.image}
                />
                <Image
                  source={require("../../../assets/send.png")}
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={style.image}
                />
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
export default ClientInbox;

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
