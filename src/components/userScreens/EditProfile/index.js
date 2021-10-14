import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Avatar from "../../atoms/avatar";
import Header from "../../atoms/header";
import AppTemplate from "../../Usertemplate";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { UserContext } from "../../../../App";
import config from "../../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

function EditProfile() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [image, setImg] = useState(null);
  const [username, setUsername] = useState("");
  const [userAboutMe, setUserAboutMe] = useState("");
  const [userInstagramUsername, setUserInstagramUsername] = useState("");

  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };

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
          AsyncStorage.removeItem("userInfo");
          const data = {
            accessToken: loggedInUser?.accessToken,
            user: result,
          };
          setLoggedInUser(data);
          AsyncStorage.setItem("userInfo", JSON.stringify(data));
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
          AsyncStorage.removeItem("userInfo");
          const data = {
            accessToken: loggedInUser?.accessToken,
            user: result,
          };
          setLoggedInUser(data);
          AsyncStorage.setItem("userInfo", JSON.stringify(data));
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
              title="Edit Profile"
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
                <Avatar
                  hi={100}
                  wi={100}
                  icon={require("../../../assets/camera.png")}
                  backcolor="white"
                  img={loggedInUser?.user?.imgURL}
                  onPress={PickImage}
                  image={image}
                />
                <View style={style.inputView}>
                  <TextInput
                    placeholder="Jassica"
                    defaultValue={loggedInUser?.user?.name}
                    style={style.input}
                    onChangeText={(e) => setUsername(e)}
                  />
                </View>

                <View style={style.inputView}>
                  <TextInput
                    placeholder="Email"
                    value={loggedInUser?.user?.email}
                    style={style.input}
                  />
                </View>

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

                <View style={style.inputView}>
                  <TextInput
                    placeholder="Email"
                    defaultValue={loggedInUser?.user?.instagramUsername}
                    style={style.input}
                    onChangeText={(e) => setUserInstagramUsername(e)}
                  />
                </View>

                <TouchableOpacity onPress={() => updateProfile()}>
                  <View style={style.button}>
                    <Text style={{ fontSize: 12, color: "white" }}>
                      Update Now
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
export default EditProfile;

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
