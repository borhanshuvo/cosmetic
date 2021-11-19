import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
} from "react-native";
import config from "../../../config";
import moment from "moment";

function InboxMessages(props) {
  const {
    messageImage,
    dis,
    backColor,
    onPress,
    left,
    right,
    justify,
    img,
    time,
    textDesign,
  } = props;
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View>
      <View
        style={[
          style.view1,
          {
            backgroundColor: backColor,
            borderBottomRightRadius: right,
            borderBottomLeftRadius: left,
            alignSelf: justify,
          },
        ]}
        onPress={onPress}
      >
        <View style={style.view5}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "20%",
            }}
          >
            <Image
              source={{ uri: `${config.APP_URL}${img}` }}
              resizeMethod="resize"
              resizeMode="contain"
              style={style.image}
            />
          </View>
          <View style={style.view4}>
            <Text
              style={{
                fontSize: 11,
                color: "grey",
                marginTop: 4,
                width: "90%",
              }}
            >
              {dis}
            </Text>
            {messageImage !== "" && (
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={style.centeredView}>
                    <View
                      style={{
                        marginLeft: "-80%",
                        backgroundColor: "red",
                        padding: 2,
                      }}
                    >
                      <Pressable onPress={() => setModalVisible(!modalVisible)}>
                        <Image
                          source={require("../../assets/cross.jpg")}
                          resizeMethod="resize"
                          resizeMode="contain"
                          style={style.image4}
                        />
                      </Pressable>
                    </View>
                    <View style={style.modalView}>
                      <Image
                        source={{ uri: `${config.APP_URL}${messageImage}` }}
                        resizeMethod="resize"
                        resizeMode="contain"
                        style={style.image3}
                      />
                    </View>
                  </View>
                </Modal>
                <Image
                  source={{ uri: `${config.APP_URL}${messageImage}` }}
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={style.image2}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <Text
        style={{
          textAlign: `${textDesign ? "left" : "right"}`,
          fontSize: 8,
          color: "rgba(0, 0, 255, 0.6)",
        }}
      >
        {moment(time).fromNow()}
      </Text>
    </View>
  );
}
export default InboxMessages;

const style = StyleSheet.create({
  view1: {
    width: "88%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    padding: 4,
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: "space-between",
  },
  view5: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  view3: {
    width: 70,

    alignItems: "center",
  },
  view4: {
    marginLeft: 4,
    width: "80%",
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  image2: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  viewtop: {
    height: 10,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 100,
    marginRight: -12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
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
  image3: {
    height: 300,
    width: 300,
    borderRadius: 5,
  },
  image4: {
    height: 25,
    width: 25,
  },
});
