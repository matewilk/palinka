import React, { FC } from "react";
import { TouchableOpacity, Text } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { MainStackParamList } from "./MainStackNavigator";
import { ProfileStackParamList } from "./ProfileStackNavigator";

export type HamburgerMenuProps = {
  navigation: StackNavigationProp<MainStackParamList | ProfileStackParamList>;
};

export const HamburgerMenu: FC<HamburgerMenuProps> = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      className="pr-4 pt-4"
    >
      <Text className="text-5xl">≡</Text>
    </TouchableOpacity>
  );
};
