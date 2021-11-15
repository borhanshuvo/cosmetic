import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Share,
} from "react-native";
import { UserContext } from "../../../App";
import config from "../../../config";

function OfferProductCard(props) {
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
    color,
    bid,
  } = props;
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);

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
    <TouchableOpacity
      style={[style.view1, { backgroundColor: color }]}
      onPress={onPress}
    >
      <View>
        <View>
          {loggedInUser?.user?.role === "admin" ? (
            <View>
              <TouchableOpacity onPress={share}>
                <Image
                  source={require("../../assets/share.png")}
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={style.image3}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginLeft: 10, marginTop: -15 }}
                onPress={() => handleProductDelete(id, endingDate)}
              >
                <Image
                  source={require("../../assets/delete.png")}
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={style.image3}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity onPress={share}>
                <Image
                  source={require("../../assets/share.png")}
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={style.image3}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={style.view5}>
          <View>
            <Image
              source={{ uri: `${config.APP_URL}${img}` }}
              resizeMethod="resize"
              resizeMode="contain"
              style={style.image}
            />
          </View>
          <View style={style.view4}>
            <Text style={{ fontSize: 14, color: "black" }}>{title}</Text>
            <Text
              style={{
                fontSize: 10,
                color: "orange",
                opacity: 0.7,
                fontWeight: "bold",
              }}
            >
              $ {parseFloat(price).toFixed(2)}
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ marginTop: 8 }}>
                {loggedInUser?.user?.role !== "admin" && (
                  <TouchableOpacity
                    onPress={ButtonClick}
                    style={{ marginRight: 15 }}
                  >
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
              <View style={{ marginTop: 12 }}>
                {quantity === "0" ? (
                  <Text style={{ fontSize: 10, color: "black" }}>
                    Out Of Stock
                  </Text>
                ) : (
                  <Text style={{ fontSize: 10, color: "black" }}>
                    In a Stock ({quantity})
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#D8E2E6",
                display: "flex",
                flexDirection: "row",
                padding: 10,
                borderRadius: 6,
              }}
            >
              <View>
                <Text style={{ fontSize: 12, color: "#FFFFFF" }}>$ {bid}</Text>
                <Text style={{ fontSize: 12, color: "#FFFFFF" }}>
                  Current Bid
                </Text>
              </View>
              <View style={{ marginLeft: 25 }}>
                {endingDate && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#FFFFFF",
                      textAlign: "right",
                    }}
                  >
                    {`${new Date(endingDate).toDateString()} - ${
                      new Date(endingDate).getHours() - 6
                    }:${new Date(endingDate).getMinutes()}:${new Date(
                      endingDate
                    ).getSeconds()}`.slice(3, 30)}
                  </Text>
                )}
                <Text
                  style={{ textAlign: "right", color: "#7E99A7", fontSize: 12 }}
                >
                  Auction End
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default OfferProductCard;

const style = StyleSheet.create({
  image: {
    height: 110,
    width: 60,
  },
  image2: {
    height: 10,
  },
  image3: {
    height: 15,
  },
  view1: {
    width: 320,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 12,
    marginLeft: 20,
    marginTop: 10,
  },
  view5: {
    width: 185,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  view2: {
    backgroundColor: "#B7C9D2",
    height: 22,
    width: 22,
    borderRadius: 6,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  view4: {
    paddingLeft: 5,
    marginLeft: 10,
  },
});
