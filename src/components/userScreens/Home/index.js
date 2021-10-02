import * as React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";

import Header from "../../atoms/header";
import LotionCard from "../../molecules/lotionCard";
import BigLotionCard from "../../molecules/bigLotionCard";
import { useNavigation } from "@react-navigation/native";

import AppTemplate from "../../Usertemplate";
const Data = [{}, {}, {}, {}, {}, {}, {}, {}];
function Home() {
  const navigation = useNavigation();
  return (
    <AppTemplate>
      <View style={{ flex: 1, backgroundColor: "#EBEAEF" }}>
        <View
          style={{
            overflow: "hidden",
          }}
        >
          <ImageBackground
            source={require("../../../assets/Mainbackgound.png")}
            resizeMode="cover"
            style={style.backgroundImage}
          >
            <Header
              img1={require("../../../assets/icon.png")}
              title="Products"
              img2={require("../../../assets/menu2.png")}
              img3={require("../../../assets/loupe.png")}
            />
            <View style={{ marginTop: 24 }}>
              <View style={style.view2}>
                <Text style={{ fontSize: 35, fontWeight: "normal" }}>Body</Text>
                <Text style={{ fontSize: 12, paddingBottom: 4 }}>Care</Text>
              </View>
              <Text style={{ fontSize: 35, marginTop: -18, marginLeft: 20 }}>
                Cosmetics
              </Text>
            </View>
            <Text style={{ fontSize: 12, paddingBottom: 4, marginTop: 40 }}>
              Skin Care
            </Text>
          </ImageBackground>
        </View>

        <SafeAreaView style={style.container}>
          <ScrollView
            style={style.scrollView}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ width: "100%", marginTop: 10 }}
              data={Data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <LotionCard
                  ButtonClick={() => navigation.navigate("UserCheckOut")}
                  onPress={() => navigation.navigate("UserProductDetail")}
                  title="Skin Care Lotion"
                  dis="Sed ut - Perspiciatis unde Perspiciatis Iciatis"
                  price="$ 29.00"
                />
              )}
            />
            <Text style={style.text2}>Popular</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ width: "100%", marginTop: 10 }}
              data={Data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <BigLotionCard
                  onPress={() => navigation.navigate("UserProductDetail")}
                  title="Skin Care Lotion"
                  dis="Sed ut  -  Perspiciatis unde omnis iste"
                  price="$ 29.00"
                  color="white"
                />
              )}
            />
            <Text style={style.text2}>Newest (20 Products)</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ width: "100%", marginTop: 10 }}
              data={Data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <LotionCard
                  ButtonClick={() => navigation.navigate("UserCheckOut")}
                  onPress={() => navigation.navigate("UserProductDetail")}
                  title="Skin Care Lotion"
                  dis="Sed ut - Perspiciatis unde Perspiciatis Iciatis"
                  price="$ 29.00"
                />
              )}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </AppTemplate>
  );
}
export default Home;

const style = StyleSheet.create({
  backgroundImage: {
    height: 250,

    borderBottomStartRadius: 40,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 22,
    paddingBottom: 22,
    overflow: "hidden",
  },
  view2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
  },

  text2: {
    color: "black",
    fontSize: 12,
    marginLeft: 8,
    marginTop: 5,
    opacity: 0.7,
  },
});
