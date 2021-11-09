import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import config from "../../../../config";

function ChangePassword() {
  const navigation = useNavigation();

  const [code, setCode] = useState("");
  const [visible, setvisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldShow, setFieldShow] = useState(false);
  const [errors, setErrors] = useState({});

  const checkVerificationCode = () => {
    fetch(`${config.APP_URL}/user/checkVerificationCode`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setErrors(data);
        } else {
          setErrors(data);
          setFieldShow(true);
        }
      });
  };

  const validate = () => {
    if (password === "") {
      setErrors({
        password: "Please Enter Password",
      });
    } else if (password.length < 8) {
      setErrors({
        password: "Password must be al least 8 characters long",
      });
    } else if (confirmPassword === "") {
      setErrors({
        confirmPassword: "Please Enter Confirm Password",
      });
    } else if (confirmPassword !== password) {
      setErrors({
        confirmPassword: "Password not macth",
      });
    } else {
      fetch(`${config.APP_URL}/user/changePassword`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          setErrors(data);
          setTimeout(() => {
            setErrors({});
            navigation.navigate("SignUp");
          }, 2000);
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
            {!fieldShow ? (
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    marginLeft: 5,
                    marginTop: 5,
                    marginBottom: -12,
                    opacity: 0.6,
                  }}
                >
                  Verification Code
                </Text>
                <View style={style.inputView}>
                  <TextInput
                    placeholder="123456"
                    value={code}
                    style={style.input}
                    onChangeText={(e) => setCode(e)}
                  />
                </View>
                {errors?.code && (
                  <Text style={{ fontSize: 12, marginTop: 8, color: "red" }}>
                    {errors?.code}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() => checkVerificationCode()}
                  style={{ marginTop: 20 }}
                >
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
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    marginLeft: 5,
                    marginTop: 5,
                    marginBottom: -12,
                    opacity: 0.6,
                  }}
                >
                  Password
                </Text>
                <View style={style.inputView}>
                  <TextInput
                    placeholder="Password"
                    value={password}
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
                {errors?.errors?.password?.msg && (
                  <Text style={{ fontSize: 12, marginTop: 8, color: "red" }}>
                    {errors?.errors?.password?.msg}
                  </Text>
                )}
                {errors?.password && (
                  <Text style={{ fontSize: 12, marginTop: 8, color: "red" }}>
                    {errors?.password}
                  </Text>
                )}

                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    marginLeft: 5,
                    marginTop: 5,
                    marginBottom: -12,
                    opacity: 0.6,
                  }}
                >
                  Confirm Password
                </Text>
                <View style={style.inputView}>
                  <TextInput
                    placeholder="Confirm Password"
                    style={style.input}
                    value={confirmPassword}
                    secureTextEntry={!visible}
                    onChangeText={(e) => setConfirmPassword(e)}
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
                {errors?.confirmPassword && (
                  <Text style={{ fontSize: 12, marginTop: 8, color: "red" }}>
                    {errors?.confirmPassword}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() => validate()}
                  style={{ marginTop: 20 }}
                >
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
              </View>
            )}
          </View>
          <View style={style.viewBottom}>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserRegister")}
            >
              <Text style={style.bottomtext1}>Need an Account?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("UserRegister")}
            >
              <Text style={style.bottomtext2}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
export default ChangePassword;

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
