import React, { createContext } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AuthStack from "./src/navigations/auth.stack";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const UserContext = createContext();
export const StateContext = createContext();

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [state, setState] = useState(0);

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
    setState(0);
    const interval = setInterval(() => {
      setState((prevState) => prevState + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [state]);

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <StateContext.Provider value={[state, setState]}>
        <NavigationContainer>
          <StatusBar animated={true} hidden={true} />
          <AuthStack />
        </NavigationContainer>
      </StateContext.Provider>
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
