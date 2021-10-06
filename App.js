import React, { createContext } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./src/navigations/auth.stack";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  const load = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      setLoggedInUser(JSON.parse(userInfo));
    } catch (err) {
      alert("Failed to fetch the data from storage");
    }
  };

  React.useEffect(() => {
    load();
  }, []);

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <NavigationContainer>
        <StatusBar animated={true} hidden={true} />
        <AuthStack />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
