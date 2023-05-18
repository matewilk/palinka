import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { ProfileScreen } from "../screens/profile";
import { OcrScreen } from "../screens/ocr";
import { HamburgerMenu } from "./HamburgerMenu";

export type ProfileStackParamList = {
  Profile: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        headerShown: true,
        headerRight: () => <HamburgerMenu navigation={navigation} />,
      })}
    >
      <ProfileStack.Screen name="Profile" component={OcrScreen} />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNavigator;
