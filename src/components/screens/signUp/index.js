import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  TextInput,
  ToastAndroid,
} from "react-native";
import Input from "../../atoms/input";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../../../config";

function SignUp() {
  const navigation = useNavigation();

  const [visible, setvisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [fieldValid, setFieldValid] = useState("");

  const validate = () => {
    if (email === "" || password === "") {
      setFieldValid("Username or Password Empty");
    } else {
      fetch(`${config.APP_URL}/login/post`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            setErrors(data);
            setFieldValid("");
          } else if (data.message) {
            setLoggedInUser(data);
            setErrors("");
          } else {
            setLoggedInUser(data);
            AsyncStorage.setItem("userInfo", JSON.stringify(data));
            navigation.navigate("ClientDashBoard");
          }
        });
    }
  };

  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#EBEAEF" }}>
      <ImageBackground
        source={require("../../../assets/Mainbackgound.png")}
        resizeMode="cover"
        style={style.backgroundImage}
      >
        <View style={style.InputContainer}>
          <View></View>
          <View style={{ marginBottom: 20 }}>
            <Image
              source={require("../../../assets/logo.png")}
              resizeMethod="resize"
              resizeMode="contain"
              style={style.logo}
            />
            <Input
              placeholder="Jassica@example.com"
              onChangeText={(e) => setEmail(e)}
            />
            {errors?.errors?.email?.msg && (
              <Text style={{ fontSize: 12, marginTop: 8, color: "red" }}>
                {errors?.errors?.email?.msg}
              </Text>
            )}
            <View style={style.inputView}>
              <TextInput
                placeholder="Password"
                style={style.input}
                secureTextEntry={!visible}
                onChangeText={(e) => setPassword(e)}
              />

              {visible ? (
                <TouchableOpacity onPress={() => setvisible(!visible)}>
                  <Image
                    source={require("../../../assets/visible.png")}
                    style={style.eye}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setvisible(!visible)}>
                  <Image
                    source={require("../../../assets/unvisible.png")}
                    style={style.eye}
                  />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              <Text
                style={{
                  alignSelf: "flex-end",
                  fontSize: 11,
                  opacity: 0.6,
                  marginTop: 8,
                }}
              >
                Forget Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => validate()}
              style={{ marginTop: 20 }}
            >
              <View style={style.button}>
                <Text style={{ fontSize: 12, color: "white" }}>Continue</Text>
              </View>
            </TouchableOpacity>
            {loggedInUser?.message && (
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  marginTop: 20,
                  color: "red",
                }}
              >
                {loggedInUser?.message}
              </Text>
            )}
            {fieldValid !== "" && (
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  marginTop: 20,
                  color: "red",
                }}
              >
                {fieldValid}
              </Text>
            )}
          </View>
          <View style={style.viewBottom}>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserRegister")}
            >
              <Text style={style.bottomtext1}>Need an Account?</Text>
            </TouchableOpacity>
            <Text style={style.bottomtext2}>Sign Up</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
export default SignUp;

const style = StyleSheet.create({
  InputContainer: {
    paddingLeft: 24,
    paddingRight: 24,
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
  },

  backgroundImage: {
    height: "100%",
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
  },
  viewBottom: {
    alignItems: "center",
    marginBottom: 15,
  },
  bottomtext1: {
    fontSize: 10,

    opacity: 0.5,
  },
  bottomtext2: {
    fontSize: 17,
    opacity: 0.7,
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
  input: {
    width: "85%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 11,
  },
  logo: {
    height: 100,
    width: 200,
    alignSelf: "center",
    marginBottom: 10,
  },
  eye: {
    height: 20,
    width: 20,
    marginRight: 14,
  },
});
