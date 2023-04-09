import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackNavigator from "./AuthStackNavigator";
import MainStackNavigator from "./MainStackNavigator";
import { useAuth } from "@clerk/clerk-expo";

type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

function RootStackNavigator() {
  const { isSignedIn } = useAuth();
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <RootStack.Screen name="Main" component={MainStackNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStackNavigator} />
      )}
    </RootStack.Navigator>
  );
}

export default RootStackNavigator;
