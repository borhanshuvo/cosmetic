import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  CheckBox,
} from "react-native";

import Input from "../../atoms/input";
import Header from "../../atoms/header";
import AppTemplate from "../../ClientTemplate";
import { useNavigation } from "@react-navigation/native";

function SpecailOffer() {
  const [isSelected, setSelection] = useState(false);
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
              title="Specail Offer"
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
                  <View
                    style={{
                      backgroundColor: "white",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 15,
                      paddingRight: 15,
                      paddingTop: 10,
                      paddingBottom: 11,
                      borderRadius: 11,
                    }}
                  >
                    <View style={{ width: "13%" }}>
                      <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={style.checkbox}
                        tintColors={{ true: "#B7C9D2", false: "black" }}
                      />
                    </View>
                    <View style={{ paddingLeft: 5 }}>
                      <TextInput placeholder="Check For Enable Offer" />
                    </View>
                  </View>
                </View>

                <View>
                  <Text style={style.containerHedingStyle}>
                    Start Date & Time
                  </Text>
                  <View style={style.viewContainer}>
                    <Input placeholder="DD" wi="25%" pa={4} />
                    <Input placeholder="MM" wi="25%" pa={4} />
                    <Input placeholder="yyyy" wi="50%" pa={4} />
                  </View>
                  <View style={style.viewContainer}>
                    <Input placeholder="00:00" wi="75%" pa={4} align="center" />
                    <Input placeholder="AM" wi="25%" pa={4} />
                  </View>
                </View>
                <View>
                  <Text style={style.containerHedingStyle}>
                    End Date & Time
                  </Text>
                  <View style={style.viewContainer}>
                    <Input placeholder="DD" wi="25%" pa={4} />
                    <Input placeholder="MM" wi="25%" pa={4} />
                    <Input placeholder="yyyy" wi="50%" pa={4} />
                  </View>
                  <View style={style.viewContainer}>
                    <Input placeholder="00:00" wi="75%" pa={4} align="center" />
                    <Input placeholder="AM" wi="25%" pa={4} />
                  </View>
                </View>

                <TouchableOpacity>
                  <View style={style.button}>
                    <Text style={{ fontSize: 12, color: "white" }}>
                      Continue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default SpecailOffer;

const style = StyleSheet.create({
  containerHedingStyle: {
    paddingLeft: 10,
    paddingTop: 12,
    opacity: 0.7,
    fontSize: 13,
  },
  checkbox: {
    alignSelf: "center",

    borderColor: "green",
  },
  viewContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
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
});
