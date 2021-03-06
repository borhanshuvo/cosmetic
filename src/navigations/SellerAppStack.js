import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ClientSidebar from "../components/orgasms/ClientSidebar";
import ClientBuyerProfile from "../components/ClientScreens/buyerProfile";
import ClientCustomerProfile from "../components/ClientScreens/customerProfile";
import ClientMessages from "../components/ClientScreens/messages";
import ClientInbox from "../components/ClientScreens/Inbox";
import ClientNotifications from "../components/ClientScreens/notification";
import ClientBidRequest2 from "../components/ClientScreens/bidRequest2";
import ClientPremiumBidRequest2 from "../components/ClientScreens/premiumBidRequest2";
import ClientPremiumRequest from "../components/ClientScreens/premiumRequest";
import ClientDashBoard from "../components/ClientScreens/dashboard";
import ClientAddProductDetail from "../components/ClientScreens/addProductDetail";
import ClientEditProductDetail from "../components/ClientScreens/editProductDetail";
import ClientEditOfferProductDetail from "../components/ClientScreens/editOfferProductDetail";
import ClientAddCatogory from "../components/ClientScreens/addCatogory";
import ClientTagClient from "../components/ClientScreens/tagClient";
import ClientSpecailOffer from "../components/ClientScreens/specailOffer";
import ClientStatics from "../components/ClientScreens/statics";
import OrderRequest from "../components/ClientScreens/orderRequest";

const Drawer = createDrawerNavigator();

const SellerAppStackNavigater = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
        drawerStyle: { backgroundColor: "transparent" },
      }}
      drawerContent={(props) => <ClientSidebar {...props} />}
    >
      <Drawer.Screen name="ClientDashBoard" component={ClientDashBoard} />
      <Drawer.Screen name="ClientBuyerProfile" component={ClientBuyerProfile} />
      <Drawer.Screen name="ClientMessages" component={ClientMessages} />
      <Drawer.Screen name="ClientInbox" component={ClientInbox} />
      <Drawer.Screen
        name="ClientNotifications"
        component={ClientNotifications}
      />
      <Drawer.Screen name="OrderRequest" component={OrderRequest} />
      <Drawer.Screen name="ClientBidRequest2" component={ClientBidRequest2} />
      <Drawer.Screen
        name="ClientPremiumBidRequest2"
        component={ClientPremiumBidRequest2}
      />
      <Drawer.Screen
        name="ClientPremiumRequest"
        component={ClientPremiumRequest}
      />
      <Drawer.Screen
        name="ClientAddProductDetail"
        component={ClientAddProductDetail}
      />
      <Drawer.Screen
        name="ClientEditProductDetail"
        component={ClientEditProductDetail}
      />
      <Drawer.Screen
        name="ClientEditOfferProductDetail"
        component={ClientEditOfferProductDetail}
      />
      <Drawer.Screen name="ClientAddCatogory" component={ClientAddCatogory} />
      <Drawer.Screen name="ClientTagClient" component={ClientTagClient} />
      <Drawer.Screen name="ClientSpecailOffer" component={ClientSpecailOffer} />
      <Drawer.Screen name="ClientStatics" component={ClientStatics} />
      <Drawer.Screen
        name="ClientCustomerProfile"
        component={ClientCustomerProfile}
      />
    </Drawer.Navigator>
  );
};

export default SellerAppStackNavigater;
