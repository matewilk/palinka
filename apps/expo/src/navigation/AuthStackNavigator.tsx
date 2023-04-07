import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignInSignUpScreen } from "../screens/signin";

type AuthStackParamList = {
  Login: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Login" component={SignInSignUpScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
