import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { WelcomeScreen } from "../screens/welcome";
import { IntroScreen } from "../screens/intro";
import { SignInSignUpScreen } from "../screens/signin";

export type AuthStackParamList = {
  Welcome: undefined;
  Intro: undefined;
  Login: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Intro" component={IntroScreen} />
      <AuthStack.Screen name="Login" component={SignInSignUpScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
