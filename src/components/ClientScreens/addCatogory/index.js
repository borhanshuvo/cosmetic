import React, { useContext, useEffect } from "react";
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
  ToastAndroid,
} from "react-native";
import Header from "../../atoms/header";
import AppTemplate from "../../ClientTemplate";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import config from "../../../../config";
import { UserContext } from "../../../../App";

function AddCatogory() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [errors, setErrors] = useState({});
  const [number, setNumber] = useState(0);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };
  useEffect(() => {
    fetch(`${config.APP_URL}/category/get`, {
      headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, [number]);

  const validate = () => {
    if (categoryName === "") {
      showToast("Please Enter Category Name");
    } else {
      fetch(`${config.APP_URL}/category/post`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${loggedInUser?.accessToken}`,
        },
        body: JSON.stringify({ categoryName }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setErrors(data);
          } else {
            setErrors(data);
            setNumber(number + 1);
            setTimeout(() => {
              setCategoryName("");
              setErrors({});
            }, 2000);
          }
        });
    }
  };

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
                  <View style={style.inputView}>
                    <TextInput
                      value={categoryName}
                      style={style.input}
                      placeholder="Add Catogory"
                      onChangeText={(e) => setCategoryName(e)}
                    />
                  </View>
                </View>

                {/* <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >

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
                </View> */}

                <TouchableOpacity onPress={() => validate()}>
                  <View style={style.button}>
                    <Text style={{ fontSize: 12, color: "white" }}>
                      Continue
                    </Text>
                  </View>
                </TouchableOpacity>
                {errors?.success && (
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      marginTop: 20,
                      color: "green",
                    }}
                  >
                    {errors?.success}
                  </Text>
                )}
                {errors?.error && (
                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: "center",
                      marginTop: 20,
                      color: "red",
                    }}
                  >
                    {errors?.error}
                  </Text>
                )}
                {categories.map((category) => (
                  <View style={style.view5} key={category._id}>
                    <View style={style.view4}>
                      <Text
                        style={{ fontSize: 13, color: "black", opacity: 0.7 }}
                      >
                        {category.categoryName}
                      </Text>
                    </View>
                  </View>
                ))}
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
    marginTop: 20,
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
  view4: {
    marginLeft: 16,
  },
  view5: {
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    marginTop: 10,
    width: "100%",
    display: "flex",
    backgroundColor: "white",
  },
  input: {
    width: "85%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 11,
  },
  inputView: {
    backgroundColor: "white",
    borderRadius: 11,
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
