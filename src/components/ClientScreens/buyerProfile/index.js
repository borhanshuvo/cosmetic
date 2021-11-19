import React, { useContext, useEffect, useState } from "react";
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
import Avatar from "../../atoms/avatar";
import Header from "../../atoms/header";
import AppTemplate from "../../ClientTemplate";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { StateContext, UserContext } from "../../../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import config from "../../../../config";

function BuyerProfile() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);
  const [show, setShow] = useState(true);
  const [image, setImg] = useState(null);
  const [username, setUsername] = useState("");
  const [userAboutMe, setUserAboutMe] = useState("");
  const [userInstagramUsername, setUserInstagramUsername] = useState("");
  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };

  useEffect(() => {
    if (isFocused) {
      setShow(true);
      setImg(null);
    }
  }, [isFocused, state]);

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

  const updateProfile = () => {
    if (image !== null) {
      const ext = image.substring(image.lastIndexOf(".") + 1);
      const fileName = image.replace(/^.*[\\\/]/, "");
      const formData = new FormData();
      formData.append("avatar", {
        name: fileName,
        uri: image,
        type: `image/${ext}`,
      });
      formData.append("name", username || loggedInUser?.user?.name);
      formData.append("aboutMe", userAboutMe || loggedInUser?.user?.aboutMe);
      formData.append(
        "instagramUsername",
        userInstagramUsername || loggedInUser?.user?.instagramUsername
      );
      fetch(`${config.APP_URL}/user/update/${loggedInUser?.user?._id}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          showToast("User updated successfully!");
          setUsername("");
          setUserAboutMe("");
          setUserInstagramUsername("");
          setImg(null);
          setShow(true);
          AsyncStorage.removeItem("userInfo");
          const data = {
            accessToken: loggedInUser?.accessToken,
            user: result.result,
          };
          setLoggedInUser(data);
          AsyncStorage.setItem("userInfo", JSON.stringify(data));
          setState((prevState) => prevState + 1);
        });
    } else {
      const formData = new FormData();
      formData.append("name", username || loggedInUser?.user?.name);
      formData.append("aboutMe", userAboutMe || loggedInUser?.user?.aboutMe);
      formData.append(
        "instagramUsername",
        userInstagramUsername || loggedInUser?.user?.instagramUsername
      );
      fetch(`${config.APP_URL}/user/update/${loggedInUser?.user?._id}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          showToast("User updated successfully!");
          setUsername("");
          setUserAboutMe("");
          setUserInstagramUsername("");
          setImg(null);
          setShow(true);
          AsyncStorage.removeItem("userInfo");
          const data = {
            accessToken: loggedInUser?.accessToken,
            user: result.result,
          };
          setLoggedInUser(data);
          AsyncStorage.setItem("userInfo", JSON.stringify(data));
          setState((prevState) => prevState + 1);
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
              title="Profile"
              img2={require("../../../assets/menu2.png")}
              img3={require("../../../assets/menu1.png")}
            />
          </View>
          <SafeAreaView style={style.container}>
            <ScrollView
              style={style.scrollView}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <View style={style.InputContainer}>
                {show ? (
                  <Avatar
                    hi={80}
                    wi={80}
                    icon={require("../../../assets/badge.png")}
                    backcolor="#707070"
                    img={loggedInUser?.user?.imgURL}
                    image={null}
                  />
                ) : (
                  <Avatar
                    hi={80}
                    wi={80}
                    icon={require("../../../assets/camera.png")}
                    backcolor="#707070"
                    img={loggedInUser?.user?.imgURL}
                    onPress={PickImage}
                    image={image}
                  />
                )}
                <View style={style.view2}>
                  <Text style={{ opacity: 0.8 }}>
                    {loggedInUser?.user?.name}
                  </Text>
                  <Text style={{ opacity: 0.5, fontSize: 8 }}>
                    {loggedInUser?.user?.email}
                  </Text>
                </View>
                <View style={{ marginTop: 8 }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ClientMessages")}
                  >
                    <View style={style.blackbutton}>
                      <Text style={{ fontSize: 11, color: "white" }}>
                        Chat With Buyer
                      </Text>
                      <Image
                        source={require("../../../assets/chat.png")}
                        style={style.chatButton}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                {show ? (
                  <View style={style.about}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      About Me
                    </Text>
                    <Text
                      style={{ fontSize: 12, color: "white", marginTop: 7 }}
                    >
                      {loggedInUser?.user?.aboutMe}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "white",
                        fontWeight: "bold",
                        marginTop: 10,
                      }}
                    >
                      Instagram Username
                    </Text>
                    <Text
                      style={{ fontSize: 12, color: "white", marginTop: 7 }}
                    >
                      {loggedInUser?.user?.instagramUsername}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "black",
                        marginLeft: 5,
                        marginBottom: -12,
                        opacity: 0.6,
                      }}
                    >
                      Name
                    </Text>

                    <View style={style.inputView}>
                      <TextInput
                        placeholder="Jassica"
                        defaultValue={loggedInUser?.user?.name}
                        style={style.input}
                        onChangeText={(e) => setUsername(e)}
                      />
                    </View>

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
                      About Me
                    </Text>

                    <TextInput
                      multiline={true}
                      numberOfLines={4}
                      placeholder="About me..."
                      defaultValue={loggedInUser?.user?.aboutMe}
                      onChangeText={(e) => setUserAboutMe(e)}
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
                      Instagram Username
                    </Text>

                    <View style={style.inputView}>
                      <TextInput
                        placeholder="Email"
                        defaultValue={loggedInUser?.user?.instagramUsername}
                        style={style.input}
                        onChangeText={(e) => setUserInstagramUsername(e)}
                      />
                    </View>
                  </View>
                )}
              </View>

              {show ? (
                <TouchableOpacity
                  style={{ marginRight: 20, marginLeft: 20 }}
                  onPress={() => setShow(false)}
                >
                  <View style={style.button}>
                    <Text style={{ fontSize: 12, color: "white" }}>
                      Edit Profile
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ marginRight: 20, marginLeft: 20 }}
                  onPress={() => updateProfile()}
                >
                  <View style={style.button}>
                    <Text style={{ fontSize: 12, color: "white" }}>
                      Update Now
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default BuyerProfile;

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
  view2: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  blackbutton: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 16,
    paddingTop: 17,
    paddingBottom: 17,
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#464646",
  },
  chatButton: {
    height: 17,
    width: 17,
    marginLeft: 10,
  },
  about: {
    width: "100%",
    height: 200,
    display: "flex",
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 16,
    paddingTop: 17,
    paddingBottom: 17,
    elevation: 5,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#B7C9D2",
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
});
