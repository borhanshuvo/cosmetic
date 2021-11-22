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
import ModalDropdown from "react-native-modal-dropdown";
import Header from "../../atoms/header";
import AppTemplate from "../../ClientTemplate";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import config from "../../../../config";
import { StateContext, UserContext } from "../../../../App";

function SpecailOffer() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const showToast = (i) => {
    ToastAndroid.show(i, ToastAndroid.SHORT);
  };
  const [products, setProducts] = useState([]);
  const [indexNumber, setIndexNumber] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [startDateHour, setStartDateHour] = useState("");
  const [startDateMinute, setStartDateMinute] = useState("");
  const [startDateSecond, setStartDateSecond] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [error, setError] = useState("");
  const [endDateHour, setEndDateHour] = useState("");
  const [endDateMinute, setEndDateMinute] = useState("");
  const [endDateSecond, setEndDateSecond] = useState("");
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [state, setState] = React.useContext(StateContext);

  useEffect(() => {
    if (isFocused) {
      try {
        fetch(`${config.APP_URL}/product/productName`, {
          headers: { authorization: `Bearer ${loggedInUser?.accessToken}` },
        })
          .then((res) => res.json())
          .then((result) => setProducts(result));
      } catch (err) {}
    }
  }, [isFocused, state]);

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
          body: "New Offer Product Added!",
        }),
      });
    });
  };

  const handelPress = () => {
    if (startDate === "") {
      showToast("Please Enter Date");
    } else if (isNaN(startDate)) {
      showToast("Only Number!");
    } else if (startDate.length > 2) {
      showToast("Maxium Two Value");
    } else if (startMonth === "") {
      showToast("Please Enter Month");
    } else if (isNaN(startMonth)) {
      showToast("Only Number!");
    } else if (startMonth.length > 2) {
      showToast("Maxium Two Value");
    } else if (startYear === "") {
      showToast("Please Enter Year");
    } else if (isNaN(startYear)) {
      showToast("Only Number!");
    } else if (startYear.length > 4) {
      showToast("Maxium Four Value");
    } else if (endDate === "") {
      showToast("Please Enter Date");
    } else if (isNaN(endDate)) {
      showToast("Only Number!");
    } else if (endDate.length > 2) {
      showToast("Maxium Two Value");
    } else if (endMonth === "") {
      showToast("Please Enter Month");
    } else if (isNaN(endMonth)) {
      showToast("Only Number!");
    } else if (endMonth.length > 2) {
      showToast("Maxium Two Value");
    } else if (endYear === "") {
      showToast("Please Enter Year");
    } else if (isNaN(endYear)) {
      showToast("Only Number!");
    } else if (endYear.length > 4) {
      showToast("Maxium Four Value");
    } else {
      fetch(`${config.APP_URL}/specialOffer/post`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${loggedInUser?.accessToken}`,
        },
        body: JSON.stringify({
          indexNumber,
          startDate,
          startMonth,
          startYear,
          startDateSecond,
          startDateMinute,
          startDateHour,
          endDate,
          endMonth,
          endYear,
          endDateSecond,
          endDateMinute,
          endDateHour,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setIndexNumber(null);
            setStartDate("");
            setStartMonth("");
            setStartYear("");
            setStartDateSecond("");
            setStartDateMinute("");
            setStartDateHour("");
            setEndDate("");
            setEndMonth("");
            setEndYear("");
            setEndDateMinute("");
            setEndDateSecond("");
            setEndDateHour("");
            setState((prevState) => prevState + 1);
            sendPushNotification(result.pushToken);
            setTimeout(() => {
              navigation.navigate("ClientDashBoard");
            }, 2000);
          }
        });
    }
  };

  const checkNumber = (e) => {
    if (isNaN(e)) {
      setError("Please enter numeric value!");
    } else {
      setError("");
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
              title="Special Offer"
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
                <View style={{ marginTop: 30 }}>
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
                    defaultValue="Select Product"
                    options={products}
                    onSelect={(e) => setIndexNumber(e)}
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
                </View>

                <View>
                  <Text style={style.containerHedingStyle}>
                    Start Date (24 hour formate)
                  </Text>
                  <View style={style.viewContainer}>
                    <TextInput
                      style={style.input}
                      placeholder="31"
                      value={startDate}
                      onChangeText={(e) => {
                        setStartDate(e);
                        checkNumber(e);
                      }}
                    />
                    <TextInput
                      style={style.input}
                      placeholder="12"
                      value={startMonth}
                      onChangeText={(e) => {
                        setStartMonth(e);
                        checkNumber(e);
                      }}
                    />
                    <TextInput
                      style={style.input}
                      placeholder="2000"
                      value={startYear}
                      onChangeText={(e) => {
                        setStartYear(e);
                        checkNumber(e);
                      }}
                    />
                  </View>
                </View>

                <View style={{ marginTop: 10 }}>
                  <View style={style.viewContainer}>
                    <TextInput
                      style={style.input}
                      placeholder="H:23"
                      value={startDateHour}
                      onChangeText={(e) => {
                        setStartDateHour(e);
                        checkNumber(e);
                      }}
                    />
                    <TextInput
                      style={style.input}
                      placeholder="M:59"
                      value={startDateMinute}
                      onChangeText={(e) => {
                        setStartDateMinute(e);
                        checkNumber(e);
                      }}
                    />
                    <TextInput
                      style={style.input}
                      placeholder="S:59"
                      value={startDateSecond}
                      onChangeText={(e) => {
                        setStartDateSecond(e);
                        checkNumber(e);
                      }}
                    />
                  </View>
                </View>

                <View>
                  <Text style={style.containerHedingStyle}>
                    End Date (24 hour formate)
                  </Text>
                  <View style={style.viewContainer}>
                    <TextInput
                      style={style.input}
                      placeholder="31"
                      value={endDate}
                      onChangeText={(e) => {
                        setEndDate(e);
                        checkNumber(e);
                      }}
                    />
                    <TextInput
                      style={style.input}
                      placeholder="12"
                      value={endMonth}
                      onChangeText={(e) => {
                        setEndMonth(e);
                        checkNumber(e);
                      }}
                    />
                    <TextInput
                      style={style.input}
                      placeholder="2000"
                      value={endYear}
                      onChangeText={(e) => {
                        setEndYear(e);
                        checkNumber(e);
                      }}
                    />
                  </View>
                </View>

                <View style={{ marginTop: 10 }}>
                  <View style={style.viewContainer}>
                    <TextInput
                      style={style.input}
                      placeholder="H:23"
                      value={endDateHour}
                      onChangeText={(e) => {
                        setEndDateHour(e);
                        checkNumber(e);
                      }}
                    />
                    <TextInput
                      style={style.input}
                      placeholder="M:59"
                      value={endDateMinute}
                      onChangeText={(e) => {
                        setEndDateMinute(e);
                        checkNumber(e);
                      }}
                    />
                    <TextInput
                      style={style.input}
                      placeholder="S:59"
                      value={endDateSecond}
                      onChangeText={(e) => {
                        setEndDateSecond(e);
                        checkNumber(e);
                      }}
                    />
                  </View>
                </View>

                {error !== "" && (
                  <Text
                    style={{
                      color: "red",
                      textAlign: "center",
                      marginTop: 10,
                      fontSize: 10,
                    }}
                  >
                    {error}
                  </Text>
                )}

                <TouchableOpacity onPress={() => handelPress()}>
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
export default SpecailOffer;

const style = StyleSheet.create({
  containerHedingStyle: {
    paddingLeft: 10,
    paddingTop: 12,
    opacity: 0.7,
    fontSize: 13,
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: "center",

    borderColor: "green",
  },
  viewContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
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
    marginTop: 150,
    marginBottom: 10,
  },
  input: {
    width: "33.33%",
    backgroundColor: "white",
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 5,
    height: 50,
  },
});
