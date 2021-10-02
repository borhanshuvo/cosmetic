import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClientSidebar from "../components/orgasms/ClientSidebar";
import ClientBuyerProfile from "../components/ClientScreens/buyerProfile";
import ClientMessages from "../components/ClientScreens/messages";
import ClientInbox from "../components/ClientScreens/Inbox";
import ClientNotifications from "../components/ClientScreens/notification";
import ClientBidRequest2 from "../components/ClientScreens/bidRequest2";
import ClientPremiumRequest from "../components/ClientScreens/premiumRequest";
import ClientDashBoard from "../components/ClientScreens/dashboard";
import ClientAddProductDetail from "../components/ClientScreens/addProductDetail";
import ClientAddCatogory from "../components/ClientScreens/addCatogory";
import ClientTagClient from "../components/ClientScreens/tagClient";
import ClientSpecailOffer from "../components/ClientScreens/specailOffer";
import ClientStatics from "../components/ClientScreens/statics";
import { UserContext } from "../../App";
import UserSignUp from "../components/screens/signUp";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const SellerAppStackNavigater = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
        drawerStyle: { backgroundColor: "transparent" },
      }}
      drawerContent={(props) => <ClientSidebar {...props} />}
    >
      {loggedInUser?.accessToken && loggedInUser?.user?.email ? (
        <Drawer.Screen name="ClientDashBoard" component={ClientDashBoard} />
      ) : (
        <Stack.Screen name="SignUp" component={UserSignUp} />
      )}
      <Drawer.Screen name="ClientBuyerProfile" component={ClientBuyerProfile} />
      <Drawer.Screen name="ClientMessages" component={ClientMessages} />
      <Drawer.Screen name="ClientInbox" component={ClientInbox} />

      <Drawer.Screen
        name="ClientNotifications"
        component={ClientNotifications}
      />

      <Drawer.Screen name="ClientBidRequest2" component={ClientBidRequest2} />
      <Drawer.Screen
        name="ClientPremiumRequest"
        component={ClientPremiumRequest}
      />

      <Drawer.Screen
        name="ClientAddProductDetail"
        component={ClientAddProductDetail}
      />
      <Drawer.Screen name="ClientAddCatogory" component={ClientAddCatogory} />
      <Drawer.Screen name="ClientTagClient" component={ClientTagClient} />
      <Drawer.Screen name="ClientSpecailOffer" component={ClientSpecailOffer} />
      <Drawer.Screen name="ClientStatics" component={ClientStatics} />
    </Drawer.Navigator>
  );
};

export default SellerAppStackNavigater;
