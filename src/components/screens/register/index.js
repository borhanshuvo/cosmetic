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
  ScrollView,
  SafeAreaView,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

function Register() {
  const [visible, setvisible] = useState(false);
  const navigation = useNavigation();
  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [instagramUsername, setInstagramUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [image, setImg] = useState(null);

  const PickImage = async () => {
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!photo.cancelled) {
      setImg(photo.uri);
    }
  };

  const validate = () => {
    if (name === "") {
      showToast("Please Enter Name");
    } else if (!isNaN(name)) {
      showToast("Name must not contain anything other than alphabet");
    } else if (email === "") {
      showToast("Please Enter Email");
    } else if (aboutMe === "") {
      showToast("Please Enter About Me");
    } else if (instagramUsername === "") {
      showToast("Please Enter Instagram Username");
    } else if (password === "") {
      showToast("Please Enter Password");
    } else if (password.length < 8) {
      showToast("Password must be al least 8 characters long");
    } else if (confirmPassword === "") {
      showToast("Please Enter Confirm Password");
    } else if (confirmPassword != password) {
      showToast("Password not macth");
    } else if (image === null) {
      showToast("Image required!");
    } else {
      const ext = image.substring(image.lastIndexOf(".") + 1);
      const fileName = image.replace(/^.*[\\\/]/, "");
      const formData = new FormData();

      formData.append("avatar", {
        name: fileName,
        uri: image,
        type: `image/${ext}`,
      });
      formData.append("name", name);
      formData.append("email", email);
      formData.append("aboutMe", aboutMe);
      formData.append("instagramUsername", instagramUsername);
      formData.append("password", password);

      fetch("https://api-cosmetic.herokuapp.com/user/post", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.errors) {
            setErrors(data);
          } else if (data.error) {
            setErrors(data);
          } else {
            setErrors(data);
            setName("");
            setEmail("");
            setAboutMe("");
            setInstagramUsername("");
            setPassword("");
            setConfirmPassword("");
            setImg(null);
            setTimeout(() => {
              setErrors("");
              navigation.navigate("SignUp");
            }, 2000);
          }
        });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#EBEAEF" }}>
      <ImageBackground
        source={require("../../../assets/Mainbackgound.png")}
        resizeMode="cover"
        style={style.backgroundImage}
      >
        <SafeAreaView>
          <ScrollView>
            <View style={style.InputContainer}>
              <View></View>
              <View style={{ marginBottom: 20 }}>
                <Image
                  source={require("../../../assets/logo.png")}
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={style.logo}
                />
                <View style={style.inputView}>
                  <TextInput
                    placeholder="Jassica"
                    value={name}
                    style={style.input}
                    onChangeText={(e) => setName(e)}
                  />
                </View>
                {errors?.errors?.name?.msg && (
                  <Text style={{ fontSize: 12, marginTop: 8, color: "red" }}>
                    {errors?.errors?.name?.msg}
                  </Text>
                )}
                <View style={style.inputView}>
                  <TextInput
                    placeholder="Jassica@example.com"
                    value={email}
                    style={style.input}
                    onChangeText={(e) => setEmail(e)}
                  />
                </View>
                {errors?.errors?.email?.msg && (
                  <Text style={{ fontSize: 12, marginTop: 8, color: "red" }}>
                    {errors?.errors?.email?.msg}
                  </Text>
                )}
                <View style={style.inputView}>
                  <TextInput
                    placeholder="About Me"
                    value={aboutMe}
                    style={style.input}
                    onChangeText={(e) => setAboutMe(e)}
                  />
                </View>
                <View style={style.inputView}>
                  <TextInput
                    placeholder="Instagram Username"
                    value={instagramUsername}
                    style={style.input}
                    onChangeText={(e) => setInstagramUsername(e)}
                  />
                </View>
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
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    style={style.buttonblack}
                    onPress={PickImage}
                  >
                    <Text style={{ fontSize: 12, color: "white" }}>
                      Add From Gallery
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
                    {image === null ? (
                      <Image
                        source={require("../../../assets/camera.png")}
                        resizeMode="contain"
                        resizeMethod="resize"
                        style={{
                          height: 25,
                          width: 25,
                        }}
                      />
                    ) : (
                      <Image
                        source={{ uri: image }}
                        resizeMode="contain"
                        resizeMethod="resize"
                        style={{
                          height: 30,
                          width: 30,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{ marginTop: 20 }}
                  onPress={() => validate()}
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
              <View style={style.viewBottom}>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                  <Text style={style.bottomtext1}>Already Have Account?</Text>
                </TouchableOpacity>

                <Text style={style.bottomtext2}>Sign In</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
export default Register;

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
    marginTop: 20,
  },
  eye: {
    height: 20,
    width: 20,
    marginRight: 14,
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
