import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import { HomeScreen } from "../screens/home";
import { PromptScreen } from "../screens/prompt";
import { ChatScreen } from "../screens/chat";
import { HamburgerMenu } from "./HamburgerMenu";

export type MainStackParamList = {
  Home: undefined;
  Prompt: undefined;
  Chat: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

function MainStackNavigator() {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        headerShown: true,
        headerRight: () => <HamburgerMenu navigation={navigation} />,
        headerBackImage: () => (
          <Ionicons name="chevron-back-outline" size={32} color="black" />
        ),
      })}
    >
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Prompt" component={PromptScreen} />
      <MainStack.Screen name="Chat" component={ChatScreen} />
    </MainStack.Navigator>
  );
}

export default MainStackNavigator;
