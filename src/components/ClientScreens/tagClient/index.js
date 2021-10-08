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
  FlatList,
} from "react-native";
import Header from "../../atoms/header";
import MessagesCard from "../../orgasms/messagesCard";
import AppTemplate from "../../ClientTemplate";
import { useNavigation } from "@react-navigation/native";

function TagClient() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  const handelSearch = (e) => {
    const search = e;
    fetch("https://api-cosmetic.herokuapp.com/user/search", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ search }),
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
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
              title="Tag Client"
              img2={require("../../../assets/menu2.png")}
              img3={require("../../../assets/loupe.png")}
            />
          </View>
          <View style={style.InputContainer}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View style={style.buttonblack}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor="white"
                  style={{
                    color: "white",
                    width: "80%",
                    paddingLeft: 12,
                  }}
                  onChangeText={(e) => handelSearch(e)}
                />

                <TouchableOpacity
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "white",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Image
                    source={require("../../../assets/search.png")}
                    resizeMode="contain"
                    resizeMethod="resize"
                    style={{
                      height: 25,
                      width: 25,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <SafeAreaView style={style.container}>
            <ScrollView
              style={style.scrollView}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ paddingLeft: 24, paddingRight: 24 }}>
                {users.length > 0 ? (
                  users.map((user) => (
                    <View key={user._id}>
                      <MessagesCard
                        id={user._id}
                        title={user.name}
                        dis={user.email}
                        img={user.imgURL}
                        backColor="white"
                        dotColor="#B7C9D2"
                      />
                    </View>
                  ))
                ) : (
                  <View>
                    <Text>{users.message}</Text>
                  </View>
                )}
                {/* <TouchableOpacity>
                  <View style={style.button}>
                    <Text style={{ fontSize: 12, color: "white" }}>
                      Continue
                    </Text>
                  </View>
                </TouchableOpacity> */}
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </AppTemplate>
  );
}
export default TagClient;

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
  scrollView: {},
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
  buttonblack: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#313131",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 16,
    color: "white",
    elevation: 5,
    marginTop: 20,
    alignItems: "center",
    marginBottom: 8,
  },
});
