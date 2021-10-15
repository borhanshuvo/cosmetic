import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import UserSidebar from "../components/orgasms/UserSidebar";

import UserHome from "../components/userScreens/Home";
import UserOrders from "../components/userScreens/orders";
import UserBidRequest from "../components/userScreens/bidRequest";
import UserPremiumBidRequest from "../components/userScreens/premiumBidRequest";
import UserBids from "../components/userScreens/bids";
import UserPremiumBids from "../components/userScreens/premiumBids";
import UserMessages from "../components/userScreens/messages";
import UserProductDetail from "../components/userScreens/productDetail";
import UserOfferProductDetail from "../components/userScreens/offerProductDetail";
import UserNotifications from "../components/userScreens/notifications";
import UserSaveNotifications from "../components/userScreens/saveNotification";
import UserCheckOut from "../components/userScreens/checkout";
import UserOfferCheckOut from "../components/userScreens/offerCheckout";
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
      <Drawer.Screen
        name="UserPremiumBidRequest"
        component={UserPremiumBidRequest}
      />
      <Drawer.Screen name="UserBids" component={UserBids} />
      <Drawer.Screen name="UserPremiumBids" component={UserPremiumBids} />
      <Drawer.Screen name="UserMessages" component={UserMessages} />
      <Drawer.Screen name="UserProductDetail" component={UserProductDetail} />
      <Drawer.Screen
        name="UserOfferProductDetail"
        component={UserOfferProductDetail}
      />
      <Drawer.Screen name="UserNotifications" component={UserNotifications} />
      <Drawer.Screen
        name="UserSaveNotifications"
        component={UserSaveNotifications}
      />
      <Drawer.Screen name="UserCheckOut" component={UserCheckOut} />
      <Drawer.Screen name="UserOfferCheckOut" component={UserOfferCheckOut} />
      <Drawer.Screen name="UserEditProfile" component={UserEditProfile} />
    </Drawer.Navigator>
  );
};

export default UserAppStackNavigater;
