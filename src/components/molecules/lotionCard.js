import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Share,
  Modal,
  Pressable,
} from "react-native";
import { UserContext } from "../../../App";
import config from "../../../config";

function LotionCard(props) {
  const {
    id,
    title,
    dis,
    price,
    onPress,
    ButtonClick,
    img,
    endingDate,
    quantity,
    handleProductDelete,
  } = props;
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  const [modalVisible, setModalVisible] = React.useState(false);

  const share = async () => {
    try {
      const result = await Share.share({
        message: `Product Name: ${title} \nProduct Description: ${dis} \nProduct Price: $${price}.00 \nProduct Image: ${config.APP_URL}${img}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  };

  return (
    <TouchableOpacity style={style.view1} onPress={onPress}>
      {loggedInUser?.user?.role === "admin" ? (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={style.centeredView}>
              <View style={style.modalView}>
                <Text style={style.modalText}>Are you want to Delete!</Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 100,
                  }}
                >
                  <Pressable
                    style={[style.button, style.buttonOpen]}
                    onPress={() => {
                      handleProductDelete(id, endingDate);
                      setTimeout(() => setModalVisible(false), 1000);
                    }}
                  >
                    <Text style={style.textStyle}>Yes</Text>
                  </Pressable>
                  <Pressable
                    style={[style.button, style.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={style.textStyle}>No</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <TouchableOpacity onPress={share}>
            <Image
              source={require("../../assets/share.png")}
              resizeMethod="resize"
              resizeMode="contain"
              style={style.image3}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: -35, marginLeft: -210 }}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Image
              source={require("../../assets/delete.png")}
              resizeMethod="resize"
              resizeMode="contain"
              style={style.image3}
            />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={share}>
          <Image
            source={require("../../assets/share.png")}
            resizeMethod="resize"
            resizeMode="contain"
            style={style.image3}
          />
        </TouchableOpacity>
      )}
      <View>
        <Image
          source={{ uri: `${config.APP_URL}${img}` }}
          resizeMethod="resize"
          resizeMode="contain"
          style={style.image}
        />
      </View>
      <View style={style.view4}>
        <Text style={{ fontSize: 14, color: "black", opacity: 0.7 }}>
          {title}
        </Text>
        {quantity === "0" ? (
          <Text style={{ fontSize: 10, color: "red" }}>Out Of Stock</Text>
        ) : (
          <Text style={{ fontSize: 10, color: "black" }}>
            In a Stock ({quantity})
          </Text>
        )}
        <Text style={{ fontSize: 12, color: "grey" }}>{dis}</Text>
        <View style={style.view3}>
          <Text style={{ fontSize: 10, color: "black", opacity: 0.7 }}>
            ${parseFloat(price).toFixed(2)}
          </Text>
          {loggedInUser?.user?.role !== "admin" && (
            <TouchableOpacity onPress={ButtonClick}>
              <View style={style.view2}>
                <Image
                  source={require("../../assets/basket.png")}
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={style.image2}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View>
          {endingDate && (
            <Text
              style={{
                fontSize: 10,
                color: "red",
                marginTop: 5,
              }}
            >
              End Date :{" "}
              {`${new Date(endingDate).toDateString()} - ${
                new Date(endingDate).getHours() - 6
              }:${new Date(endingDate).getMinutes()}:${new Date(
                endingDate
              ).getSeconds()}`}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default LotionCard;

const style = StyleSheet.create({
  view1: {
    width: 180,
    backgroundColor: "white",
    alignItems: "center",
    padding: 4,
    margin: 8,
    borderRadius: 30,
  },
  image: {
    height: 110,
    width: 150,
  },
  image2: {
    height: 30,
  },
  image3: {
    marginTop: 10,
    marginLeft: 100,
    height: 15,
    marginBottom: 10,
  },
  view2: {
    backgroundColor: "#B7C9D2",
    height: 26,
    width: 26,
    borderRadius: 6,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  view3: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  view4: {
    width: 160,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "green",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
