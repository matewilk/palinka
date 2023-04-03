import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home";
import { QuestionScreen } from "../screens/question";
import { ChatScreen } from "../screens/chat";

export type MainStackParamList = {
  Home: undefined;
  Question: undefined;
  Chat: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

function MainStackNavigator() {
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}
    >
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Question" component={QuestionScreen} />
      <MainStack.Screen name="Chat" component={ChatScreen} />
    </MainStack.Navigator>
  );
}

export default MainStackNavigator;
