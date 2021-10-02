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
import AppTemplate from "../../ClientTemplate";
import { useNavigation } from "@react-navigation/native";
function Messages() {
  const navigation = useNavigation();
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
              <MessagesCard
                onPress={() => navigation.navigate("ClientInbox")}
                title="Jassica Jons"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
              Perspiciatis unde omnis iste...              "
                backColor="white"
                dotColor="#B7C9D2"
              />
              <MessagesCard
                onPress={() => navigation.navigate("ClientInbox")}
                title="Jassica Jons"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
              Perspiciatis unde omnis iste...              "
                backColor="white"
                dotColor="#B7C9D2"
              />
              <MessagesCard
                onPress={() => navigation.navigate("ClientInbox")}
                title="Jassica Jons"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
              />
              <MessagesCard
                onPress={() => navigation.navigate("ClientInbox")}
                title="Jassica Jons"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
              />
              <MessagesCard
                onPress={() => navigation.navigate("ClientInbox")}
                title="Jassica Jons"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
              />
              <MessagesCard
                onPress={() => navigation.navigate("ClientInbox")}
                title="Jassica Jons"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
              />
              <MessagesCard
                onPress={() => navigation.navigate("ClientInbox")}
                title="Jassica Jons"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
              />
              <MessagesCard
                onPress={() => navigation.navigate("ClientInbox")}
                title="Jassica Jons"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
              />
              <MessagesCard
                onPress={() => navigation.navigate("ClientInbox")}
                title="Jassica Jons"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
              />
              <MessagesCard
                onPress={() => navigation.navigate("ClientInbox")}
                title="Jassica Jons"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
              />
              <MessagesCard
                onPress={() => navigation.navigate("ClientInbox")}
                title="Jassica Jons"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
              />
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
