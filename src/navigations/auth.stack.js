import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserSignUp from "../components/screens/signUp";
import UserRegister from "../components/screens/register";
import UserForgetPassword from "../components/screens/forgetPassword";
import UserChangesPassword from "../components/screens/changePassword";
import UserAppStack from "../navigations/UserAppStack";
import SellerAppStack from "../navigations/SellerAppStack";
import { UserContext } from "../../App";

const Stack = createNativeStackNavigator();

function AuthStack() {
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {loggedInUser?.accessToken && loggedInUser?.user?.email ? (
        <Stack.Screen name="Client" component={SellerAppStack} />
      ) : (
        <Stack.Screen name="SignUp" component={UserSignUp} />
      )}
      <Stack.Screen name="UserRegister" component={UserRegister} />
      <Stack.Screen name="ForgetPassword" component={UserForgetPassword} />
      <Stack.Screen name="ChangePassword" component={UserChangesPassword} />
      <Stack.Screen name="User" component={UserAppStack} />
    </Stack.Navigator>
  );
}

export default AuthStack;
