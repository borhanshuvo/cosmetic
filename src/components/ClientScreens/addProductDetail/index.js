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
import Header from "../../atoms/header";
import AppTemplate from "../../ClientTemplate";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import ModalDropdown from "react-native-modal-dropdown";
import config from "../../../../config";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../../../../App";

function AddProductDetail() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [categories, setCategories] = useState([]);
  const [image, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bid, setBid] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };

  useEffect(() => {
    if (isFocused) {
      try {
        fetch(`${config.APP_URL}/category/categoryName`, {
          headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        })
          .then((res) => res.json())
          .then((result) => setCategories(result));
      } catch (err) {}
    }
  }, [isFocused]);

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

  const sendPushNotification = async (token) => {
    await token.map((tkn) => {
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: tkn.pushToken,
          sound: "default",
          title: "Cosmetic",
          body: "New Product Added!",
        }),
      });
    });
  };

  const addProduct = () => {
    if (title === "") {
      showToast("Product title required!");
    } else if (!isNaN(title)) {
      showToast("Title must not contain anything other than alphabet");
    } else if (description === "") {
      showToast("Product description required!");
    } else if (bid === "") {
      showToast("Minimum bid required!");
    } else if (isNaN(bid)) {
      showToast("Bid only numeric value!");
    } else if (category === "") {
      showToast("Select category!");
    } else if (quantity === "") {
      showToast("Minimum quantity required!");
    } else if (isNaN(quantity)) {
      showToast("Quantity only numeric value!");
    } else if (price === "") {
      showToast("Product price required!");
    } else if (isNaN(price)) {
      showToast("Price only numeric value!");
    } else if (image === null) {
      showToast("Image required!");
    } else {
      const ext = image.substring(image.lastIndexOf(".") + 1);
      const fileName = image.replace(/^.*[\\\/]/, "");
      const formData = new FormData();
      formData.append("img", {
        name: fileName,
        uri: image,
        type: `image/${ext}`,
      });
      formData.append("title", title);
      formData.append("description", description);
      formData.append("bid", bid);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", category);
      fetch(`${config.APP_URL}/product/post`, {
        method: "POST",
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            showToast(result.success);
            sendPushNotification(result.pushToken);
            setTitle("");
            setDescription("");
            setBid("");
            setCategory("");
            setPrice("");
            setQuantity("");
            setImg(null);
            setTimeout(() => {
              navigation.navigate("ClientDashBoard");
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
                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    marginLeft: 5,
                    marginBottom: -12,
                    marginTop: 3,
                    opacity: 0.6,
                  }}
                >
                  Title
                </Text>

                <View style={style.inputView}>
                  <TextInput
                    placeholder="Product Title"
                    value={title}
                    style={style.input}
                    onChangeText={(e) => setTitle(e)}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    marginLeft: 5,
                    marginBottom: -12,
                    marginTop: 3,
                    opacity: 0.6,
                  }}
                >
                  Description
                </Text>

                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Description..."
                  value={description}
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
                  onChangeText={(e) => setDescription(e)}
                />

                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    marginLeft: 5,
                    marginTop: 3,
                    marginBottom: -12,
                    opacity: 0.6,
                  }}
                >
                  Bid
                </Text>

                <View style={style.inputView}>
                  <TextInput
                    placeholder="Minimum Bid"
                    value={bid}
                    style={style.input}
                    onChangeText={(e) => setBid(e)}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    marginLeft: 5,
                    marginBottom: -12,
                    marginTop: 3,
                    opacity: 0.6,
                  }}
                >
                  Category
                </Text>

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
                  onSelect={(i, v) => setCategory(v)}
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

                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    marginLeft: 5,
                    marginBottom: -12,
                    marginTop: 3,
                    opacity: 0.6,
                  }}
                >
                  Quantity
                </Text>

                <View style={style.inputView}>
                  <TextInput
                    placeholder="Product Stock (Quantity)"
                    value={quantity}
                    style={style.input}
                    onChangeText={(e) => setQuantity(e)}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    marginLeft: 5,
                    marginBottom: -12,
                    marginTop: 3,
                    opacity: 0.6,
                  }}
                >
                  Price
                </Text>

                <View style={style.inputView}>
                  <TextInput
                    placeholder="Buy Now Price"
                    value={price}
                    style={style.input}
                    onChangeText={(e) => setPrice(e)}
                  />
                </View>

                <Text
                  style={{
                    fontSize: 12,
                    color: "black",
                    marginLeft: 5,
                    marginBottom: -12,
                    marginTop: 3,
                    opacity: 0.6,
                  }}
                >
                  Image
                </Text>

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
                <TouchableOpacity onPress={() => addProduct()}>
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
