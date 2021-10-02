import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import BigLotionCard from "../../molecules/bigLotionCard";
import Avatar from "../../atoms/avatar";
import Header from "../../atoms/header";
const Data = [{}, {}, {}, {}, {}, {}, {}, {}];
import AppTemplate from "../../ClientTemplate";
import { useNavigation } from "@react-navigation/native";

function BuyerProfile() {
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
              title="Buyer Profile"
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
              <View style={style.InputContainer}>
                <Avatar
                  hi={80}
                  wi={80}
                  icon={require("../../../assets/badge.png")}
                  backcolor="#707070"
                />
                <View style={style.view2}>
                  <Text style={{ opacity: 0.8 }}>User Name</Text>
                  <Text style={{ opacity: 0.5, fontSize: 8 }}>
                    User@example.com
                  </Text>
                </View>
                <View style={{ marginTop: 8 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ClientMessages")}
                  >
                    <View style={style.blackbutton}>
                      <Text style={{ fontSize: 11, color: "white" }}>
                        Chat With Buyer
                      </Text>
                      <Image
                        source={require("../../../assets/chat.png")}
                        style={style.chatButton}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={style.about}>
                  <Text
                    style={{ fontSize: 12, color: "white", fontWeight: "bold" }}
                  >
                    About
                  </Text>
                  <Text style={{ fontSize: 12, color: "white", marginTop: 7 }}>
                    Sed ut - Perspiciatis unde omnis iste iatis unde omnis iste
                    Perspiciatis unde omnis iste… Sed ut - Perspiciatis unde
                    omnis iste iatis unde omnis iste Perspiciatis unde omnis
                    iste...Sed ut - Perspiciatis unde omnis iste iatis unde
                    omnis iste Perspiciatis unde omnis iste...
                  </Text>
                </View>
              </View>
              <View style={style.view3}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    opacity: 0.7,
                    marginTop: 10,
                    paddingLeft: 10,
                  }}
                >
                  Purchase History (20 Products)
                </Text>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  style={{ width: "100%", marginTop: 10 }}
                  data={Data}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <BigLotionCard
                      title="Skin Care Lotion"
                      dis="Sed ut  -  Perspiciatis unde omnis iste"
                      price="$ 29.00"
                      color="rgba(255, 255,255, 0.4)"
                    />
                  )}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default BuyerProfile;

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 0.5,
    borderRadius: 50,
    borderColor: "#B1B9B5",
    paddingLeft: 20,
    width: "100%",
  },
  InputContainer: {
    paddingLeft: 24,
    paddingRight: 24,
  },

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
  scrollView: { marginTop: 20 },
  button: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#B7C9D2",
    alignItems: "center",
    borderRadius: 16,
    paddingTop: 17,
    paddingBottom: 17,
    elevation: 5,
    marginTop: 20,
    marginBottom: 10,
  },
  view2: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  blackbutton: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 16,
    paddingTop: 17,
    paddingBottom: 17,
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#464646",
  },
  chatButton: {
    height: 17,
    width: 17,
    marginLeft: 10,
  },
  about: {
    width: "100%",
    height: 200,
    display: "flex",
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 16,
    paddingTop: 17,
    paddingBottom: 17,
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#B7C9D2",
  },
});
