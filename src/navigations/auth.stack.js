import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserSignUp from "../components/screens/signUp";
import UserRegister from "../components/screens/register";
import UserForgetPassword from "../components/screens/forgetPassword";
import UserAppStack from "../navigations/UserAppStack";
import SellerAppStack from "../navigations/SellerAppStack";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Client" component={SellerAppStack} />

      <Stack.Screen name="SignUp" component={UserSignUp} />
      <Stack.Screen name="UserRegister" component={UserRegister} />
      <Stack.Screen name="ForgetPassword" component={UserForgetPassword} />
      <Stack.Screen name="User" component={UserAppStack} />
    </Stack.Navigator>
  );
}

export default AuthStack;
