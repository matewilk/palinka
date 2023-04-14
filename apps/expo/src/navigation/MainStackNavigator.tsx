import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerActions } from "@react-navigation/native";
import { TouchableOpacity, Text } from "react-native";

import { HomeScreen } from "../screens/home";
import { PromptScreen } from "../screens/prompt";
import { ChatScreen } from "../screens/chat";

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
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            className="pr-4 pt-4"
          >
            <Text className="text-5xl">≡</Text>
          </TouchableOpacity>
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
