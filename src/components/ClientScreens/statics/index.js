import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

import Header from "../../atoms/header";
import Graph from "../../orgasms/graph";
import AppTemplate from "../../ClientTemplate";
import { useNavigation } from "@react-navigation/native";

function Statics() {
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
              title="Statistics"
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
                <View style={{ marginTop: 30 }}>
                  <View style={style.smallCard}>
                    <View style={{ width: "35%" }}>
                      <Text style={{ fontSize: 10, opacity: 0.7 }}>
                        Total Balance
                      </Text>
                      <Text style={{ fontSize: 13, opacity: 0.7 }}>USD</Text>
                    </View>
                    <View style={{ width: "45%" }}>
                      <Text style={{ fontSize: 24, opacity: 0.7 }}>
                        5,000.00
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity>
                  <View style={style.button}>
                    <Text style={{ fontSize: 12, color: "white" }}>
                      Withdraw
                    </Text>
                  </View>
                </TouchableOpacity>
                <Graph />
                <View style={{ marginTop: 20 }}>
                  <View style={style.Card}>
                    <View style={style.card2}>
                      <Text style={{ fontSize: 12, opacity: 0.5 }}>
                        Total Earnings
                      </Text>
                      <Text style={{ fontSize: 13, opacity: 0.7 }}>
                        35,000.00 USD
                      </Text>
                    </View>
                    <View style={style.card2}>
                      <Text style={{ fontSize: 12, opacity: 0.5 }}>
                        Total Earnings
                      </Text>
                      <Text style={{ fontSize: 13, opacity: 0.7 }}>542</Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default Statics;

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
  smallCard: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 11,
    borderRadius: 11,
  },
  Card: {
    backgroundColor: "white",
    display: "flex",

    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 11,
    borderRadius: 11,
  },
  card2: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 6,
  },
});
