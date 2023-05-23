import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { OcrScreen } from "../screens/ocr";
import { HamburgerMenu } from "./HamburgerMenu";

export type OcrStackParamList = {
  Scaner: undefined;
};

const OcrStack = createStackNavigator<OcrStackParamList>();

function OcrStackNavigator() {
  return (
    <OcrStack.Navigator
      initialRouteName="Scaner"
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        headerShown: true,
        headerRight: () => <HamburgerMenu navigation={navigation} />,
      })}
    >
      <OcrStack.Screen name="Scaner" component={OcrScreen} />
    </OcrStack.Navigator>
  );
}

export default OcrStackNavigator;
