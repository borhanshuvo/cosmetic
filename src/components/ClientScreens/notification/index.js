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

function Notifications() {
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
              <NotificationCard
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
              Perspiciatis unde omnis iste...              "
                backColor="white"
                dotColor="#B7C9D2"
                toggle={false}
              />
              <NotificationCard
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
              Perspiciatis unde omnis iste...              "
                backColor="white"
                dotColor="#B7C9D2"
                toggle={false}
              />
              <NotificationCard
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
                toggle={true}
              />
              <NotificationCard
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
                toggle={true}
              />
              <NotificationCard
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
                toggle={true}
              />
              <NotificationCard
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
                toggle={true}
              />
              <NotificationCard
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
                toggle={true}
              />
              <NotificationCard
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
                toggle={true}
              />
              <NotificationCard
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
                toggle={true}
              />
              <NotificationCard
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
                toggle={true}
              />
              <NotificationCard
                title="Skin Care Lotion"
                dis="Sed ut  -  Perspiciatis unde omnis iste Perspiciatis unde omnis iste
                 Perspiciatis unde omnis iste...              "
                backColor="rgba(255, 255,255, 0.4)"
                dotColor="transparent"
                toggle={true}
              />
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
