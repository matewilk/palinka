import React, { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import { MainStackParamList } from "./MainStackNavigator";
import { ProfileStackParamList } from "./ProfileStackNavigator";

export type HamburgerMenuProps = {
  navigation: StackNavigationProp<MainStackParamList | ProfileStackParamList>;
};

export const HamburgerMenu: FC<HamburgerMenuProps> = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      className="pr-2"
    >
      <View className="flex flex-row items-center">
        <Ionicons name="menu" size={32} color="black" />
      </View>
    </TouchableOpacity>
  );
};
