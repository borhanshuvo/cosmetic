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
import { StateContext, UserContext } from "../../../../App";

function EditOfferProductDetail({ route }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { id } = route?.params;

  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [image, setImg] = useState(null);
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productBid, setProductBid] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);

  useEffect(() => {
    if (isFocused) {
      try {
        fetch(`${config.APP_URL}/category/categoryName`, {
          headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        })
          .then((res) => res.json())
          .then((result) => setCategories(result));

        fetch(`${config.APP_URL}/specialOffer/get/${id}`, {
          headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        })
          .then((res) => res.json())
          .then((result) => setProduct(result));
      } catch (err) {}
    }
  }, [isFocused, id, state]);

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

  const updateOfferProduct = () => {
    if (image !== null) {
      const ext = image.substring(image.lastIndexOf(".") + 1);
      const fileName = image.replace(/^.*[\\\/]/, "");
      const formData = new FormData();
      formData.append("img", {
        name: fileName,
        uri: image,
        type: `image/${ext}`,
      });
      formData.append("title", productTitle || product?.product?.title);
      formData.append(
        "description",
        productDescription || product?.product?.description
      );
      formData.append("bid", productBid || product?.product?.bid);
      formData.append("price", productPrice || product?.product?.price);
      formData.append(
        "quantity",
        productQuantity || product?.product?.quantity
      );
      formData.append(
        "category",
        productCategory || product?.product?.category
      );
      fetch(`${config.APP_URL}/specialOffer/update/${product?._id}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.errors) {
            showToast(result.errors.img.msg.message);
          } else {
            showToast("Product was updated successfully!");
            setProductTitle("");
            setProductDescription("");
            setProductBid("");
            setProductCategory("");
            setProductPrice("");
            setProductQuantity("");
            setState((prevState) => prevState + 1);
            setImg(null);
            setTimeout(() => {
              navigation.navigate("ClientDashBoard");
            }, 2000);
          }
        });
    } else {
      const formData = new FormData();
      formData.append("product.title", productTitle || product?.product?.title);
      formData.append(
        "product.description",
        productDescription || product?.product?.description
      );
      formData.append("product.bid", productBid || product?.product?.bid);
      formData.append("product.price", productPrice || product?.product?.price);
      formData.append(
        "product.quantity",
        productQuantity || product?.product?.quantity
      );
      formData.append(
        "product.category",
        productCategory || product?.product?.category
      );
      fetch(`${config.APP_URL}/specialOffer/update/${product?._id}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.errors) {
            showToast(result.errors.img.msg.message);
          } else {
            showToast("Product was updated successfully!");
            setProductTitle("");
            setProductDescription("");
            setProductBid("");
            setProductCategory("");
            setProductPrice("");
            setProductQuantity("");
            setState((prevState) => prevState + 1);
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
              title="Edit a Product"
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
                    placeholder="Name"
                    defaultValue={product?.product?.title}
                    style={style.input}
                    onChangeText={(e) => setProductTitle(e)}
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
                  defaultValue={product?.product?.description}
                  onChangeText={(e) => setProductDescription(e)}
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
                    marginTop: 3,
                    marginBottom: -12,
                    opacity: 0.6,
                  }}
                >
                  Bid
                </Text>

                <View style={style.inputView}>
                  <TextInput
                    placeholder="Bid"
                    defaultValue={product?.product?.bid}
                    style={style.input}
                    onChangeText={(e) => setProductBid(e)}
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
                  defaultValue={product?.product?.category}
                  onSelect={(i, v) => setProductCategory(v)}
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
                    placeholder="Quantity"
                    defaultValue={product?.product?.quantity}
                    style={style.input}
                    onChangeText={(e) => setProductQuantity(e)}
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
                    placeholder="Price"
                    defaultValue={product?.product?.price}
                    style={style.input}
                    onChangeText={(e) => setProductPrice(e)}
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
                      Update From Gallery
                    </Text>
                  </TouchableOpacity>
                  <View
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
                        source={{
                          uri: `${config.APP_URL}${product?.product?.imgURL}`,
                        }}
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
                          height: 25,
                          width: 25,
                        }}
                      />
                    )}
                  </View>
                </View>
                <TouchableOpacity onPress={() => updateOfferProduct()}>
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
export default EditOfferProductDetail;

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
