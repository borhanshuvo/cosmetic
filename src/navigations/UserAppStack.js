import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import UserSidebar from "../components/orgasms/UserSidebar";

import UserHome from "../components/userScreens/Home";
import UserOrders from "../components/userScreens/orders";
import UserBidRequest from "../components/userScreens/bidRequest";
import UserMessages from "../components/userScreens/messages";
import UserProductDetail from "../components/userScreens/productDetail";
import UserNotifications from "../components/userScreens/notifications";
import UserCheckOut from "../components/userScreens/checkout";
import UserEditProfile from "../components/userScreens/EditProfile";
import UserInbox from "../components/userScreens/inbox";

const Drawer = createDrawerNavigator();

const UserAppStackNavigater = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
        drawerStyle: { backgroundColor: "transparent" },
      }}
      drawerContent={(props) => <UserSidebar {...props} />}
    >
      <Drawer.Screen name="UserHome" component={UserHome} />
      <Drawer.Screen name="UserInbox" component={UserInbox} />
      <Drawer.Screen name="UserOrders" component={UserOrders} />
      <Drawer.Screen name="UserBidRequest" component={UserBidRequest} />
      <Drawer.Screen name="UserMessages" component={UserMessages} />
      <Drawer.Screen name="UserProductDetail" component={UserProductDetail} />
      <Drawer.Screen name="UserNotifications" component={UserNotifications} />
      <Drawer.Screen name="UserCheckOut" component={UserCheckOut} />
      <Drawer.Screen name="UserEditProfile" component={UserEditProfile} />
    </Drawer.Navigator>
  );
};

export default UserAppStackNavigater;
