import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigator from "./RootStackNavigator";

function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
}

export default AppNavigator;
