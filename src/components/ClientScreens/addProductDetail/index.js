import React, { useEffect, useState } from "react";
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
import { useNavigation, useIsFocused } from "@react-navigation/native";
import ModalDropdown from "react-native-modal-dropdown";
import config from "../../../../config";
import * as ImagePicker from "expo-image-picker";

function AddProductDetail() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [categories, setCategories] = useState([]);
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bid, setBid] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (isFocused) {
      try {
        fetch(`${config.APP_URL}/category/categoryName`)
          .then((res) => res.json())
          .then((result) => setCategories(result));
      } catch (err) {}
    }
  }, [isFocused]);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImg(result);
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
                <View style={style.inputView}>
                  <TextInput
                    placeholder="Name"
                    value={title}
                    style={style.input}
                    onChangeText={(e) => setTitle(e)}
                  />
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
                  defaultValue="Select Category"
                  options={categories}
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
                    onPress={PickImage}
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
