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
  TextInput,
} from "react-native";
import Input from "../../atoms/input";
import Header from "../../atoms/header";
import AppTemplate from "../../ClientTemplate";
import { useNavigation } from "@react-navigation/native";

function AddProductDetail() {
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
              title="Add a Product"
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
                  <Input placeholder="Product Title" />
                </View>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Description..."
                  style={{
                    backgroundColor: "white",
                    display: "flex",
                    height: 100,
                    textAlignVertical: "top",
                    marginTop: 12,
                    borderRadius: 10,

                    justifyContent: "flex-start",
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 8,
                    paddingBottom: 8,
                  }}
                />
                <Input placeholder="Minimum Bid ($ 00.00)" />

                <Input placeholder="Product Stock (Quantity)" />
                <Input placeholder="Buy Now Price" />
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TouchableOpacity style={style.buttonblack}>
                    <Text style={{ fontSize: 12, color: "white" }}>
                      Update From Gallery
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: "white",
                      marginTop: 8,
                      borderRadius: 6,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Image
                      source={require("../../../assets/camera.png")}
                      resizeMode="contain"
                      resizeMethod="resize"
                      style={{
                        height: 25,
                        width: 25,
                      }}
                    />
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
export default AddProductDetail;

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
    marginTop: 8,
    marginBottom: 10,
  },
  buttonblack: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#313131",
    width: "78%",
    borderRadius: 16,
    paddingTop: 17,
    paddingBottom: 17,
    elevation: 5,
    marginTop: 20,
    alignItems: "center",
    marginBottom: 8,
  },
});
