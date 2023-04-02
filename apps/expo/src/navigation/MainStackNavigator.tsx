import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home";

type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

function MainStackNavigator() {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <MainStack.Screen name="Home" component={HomeScreen} />
    </MainStack.Navigator>
  );
}

export default MainStackNavigator;
