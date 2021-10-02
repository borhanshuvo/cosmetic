import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import Input from "../../atoms/input";
import ModalDropdown from "react-native-modal-dropdown";
import CheckOutCard from "../../orgasms/checkOutCard";
import { useNavigation } from "@react-navigation/native";
import Header from "../../atoms/header";
import AppTemplate from "../../Usertemplate";

function CheckOut() {
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
              title="Check Out"
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
                <Input placeholder="Address" />
                <Input placeholder="Street Address" />
                <ModalDropdown
                  isFullWidth
                  textStyle={{ flex: 1, fontSize: 15 }}
                  animated={true}
                  renderRightComponent={() => (
                    <Image
                      source={require("../../../assets/down.png")}
                      resizeMethod="resize"
                      resizeMode="cover"
                      style={{ height: 18, width: 18, marginRight: 25 }}
                    />
                  )}
                  dropdownStyle={{
                    width: "86%",
                    marginLeft: -14,
                    marginTop: 14,
                  }}
                  defaultValue="Select City"
                  options={["Lahore", "Paris", "Islamabad", "Quetta"]}
                  style={{
                    backgroundColor: "white",
                    height: 50,
                    marginTop: 14,
                    borderRadius: 11,
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: 14,
                  }}
                />
                <Input placeholder="Phone Number" />
              </View>

              <View style={{ marginTop: 10 }}>
                <CheckOutCard />
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default CheckOut;

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
});
