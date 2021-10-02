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
} from "react-native";
import Input from "../../atoms/input";
import Header from "../../atoms/header";
import AppTemplate from "../../ClientTemplate";
import { useNavigation } from "@react-navigation/native";

function AddCatogory() {
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
              title="Add Catogory"
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
                  <Input placeholder="Add Catogory" />
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {/* <Text>jj</Text> */}

                  <TouchableOpacity style={style.buttonblack}>
                    <Text
                      style={{ fontSize: 12, color: "white", paddingLeft: 15 }}
                    >
                      Update From Gallery
                    </Text>
                    <TouchableOpacity
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: "white",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Image
                        source={require("../../../assets/plus.png")}
                        resizeMode="contain"
                        resizeMethod="resize"
                        style={{
                          height: 25,
                          width: 25,
                        }}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
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
export default AddCatogory;

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
    marginTop: 250,
    marginBottom: 10,
  },
  buttonblack: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#313131",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 16,

    elevation: 5,
    marginTop: 20,
    alignItems: "center",
    marginBottom: 8,
  },
});
