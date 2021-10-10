import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserSignUp from "../components/screens/signUp";
import UserRegister from "../components/screens/register";
import UserForgetPassword from "../components/screens/forgetPassword";
import UserChangesPassword from "../components/screens/changePassword";
import UserAppStack from "../navigations/UserAppStack";
import SellerAppStack from "../navigations/SellerAppStack";
import { UserContext } from "../../App";
import jwt_decode from "jwt-decode";

const Stack = createNativeStackNavigator();

function AuthStack() {
  const [loggedInUser, setLoggedInUser] = React.useContext(UserContext);
  // const [token, setToken] = React.useState({});

  // React.useEffect(() => {
  //   const checkExpireyTime = () => {
  //     if (loggedInUser?.accessToken) {
  //       const token = jwt_decode(loggedInUser?.accessToken);
  //       const currentTime = Math.round(new Date().getTime() / 1000);

  //       const logout = async () => {
  //         await AsyncStorage.removeItem("userInfo");
  //         setLoggedInUser({});
  //       };

  //       setTimeout(() => {
  //         logout();
  //       }, token?.exp);
  //     }
  //   };
  //   checkExpireyTime();
  //   return () => {
  //     checkExpireyTime();
  //   };
  // }, [loggedInUser?.accessToken]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {loggedInUser?.accessToken ? (
        <>
          {loggedInUser?.user?.role === "admin" ? (
            <Stack.Screen name="Client" component={SellerAppStack} />
          ) : (
            <Stack.Screen name="User" component={UserAppStack} />
          )}
        </>
      ) : (
        <Stack.Screen name="SignUp" component={UserSignUp} />
      )}
      <Stack.Screen name="UserRegister" component={UserRegister} />
      <Stack.Screen name="ForgetPassword" component={UserForgetPassword} />
      <Stack.Screen name="ChangePassword" component={UserChangesPassword} />
    </Stack.Navigator>
  );
}

export default AuthStack;
