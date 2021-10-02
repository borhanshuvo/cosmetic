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
const Data = [{}, {}, {}, {}, {}, {}, {}, {}];
import AppTemplate from "../../ClientTemplate";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { UserContext } from "../../../../App";

function DashBoard() {
  const navigation = useNavigation();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
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
              img1={loggedInUser?.user?.imgURL}
              title="Dashboard"
              img2={require("../../../assets/menu2.png")}
              img3={require("../../../assets/loupe.png")}
            />

            <Text style={{ fontSize: 12, paddingBottom: 4, marginTop: 50 }}>
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
            <Text style={style.text2}>Best Selling</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ width: "100%", marginTop: 10 }}
              data={Data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <LotionCard
                  ButtonClick={() =>
                    navigation.navigate("ClientAddProductDetail")
                  }
                  onPress={() => navigation.navigate("ClientAddProductDetail")}
                  title="Skin Care Lotion"
                  dis="Sed ut - Perspiciatis unde Perspiciatis Iciatis"
                  price="$ 29.00"
                />
              )}
            />
            <Text style={style.text2}>Tranding</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ width: "100%", marginTop: 10 }}
              data={Data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <BigLotionCard
                  onPress={() => navigation.navigate("ClientAddProductDetail")}
                  title="Skin Care Lotion"
                  dis="Sed ut  -  Perspiciatis unde omnis iste"
                  price="$ 29.00"
                  color="white"
                />
              )}
            />
            <Text style={style.text2}>Regular Products</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ width: "100%", marginTop: 10 }}
              data={Data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <LotionCard
                  ButtonClick={() =>
                    navigation.navigate("ClientAddProductDetail")
                  }
                  onPress={() => navigation.navigate("ClientAddProductDetail")}
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
export default DashBoard;

const style = StyleSheet.create({
  backgroundImage: {
    height: 170,

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
  scrollView: {},
  text2: {
    color: "black",
    fontSize: 12,
    marginLeft: 8,
    marginTop: 14,
    opacity: 0.7,
  },
});
