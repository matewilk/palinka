import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerActions } from "@react-navigation/native";

import { ProfileScreen } from "../screens/profile";

export type ProfileStackParamList = {
  Profile: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
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
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNavigator;
