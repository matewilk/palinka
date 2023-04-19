import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAuth } from "@clerk/clerk-expo";

import { translate, tokens } from "../i18n";
import MainStackNavigator from "./MainStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(props: any) {
  const { signOut } = useAuth();
  const { progress, ...rest } = props;

  // Function to handle logout logic
  const handleLogout = () => {
    signOut();
  };

  return (
    <DrawerContentScrollView {...rest} className="">
      <View>
        <DrawerItemList {...rest} />
      </View>
      <TouchableOpacity onPress={handleLogout}>
        <Text className="m-3 rounded-sm bg-red-100 px-2 py-4 font-medium">
          {translate(tokens.drawer.logout)}
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

function AppDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name={translate(tokens.drawer.home) as keyof DrawerParamList}
        component={MainStackNavigator}
      />
      <Drawer.Screen
        name={translate(tokens.drawer.profile) as keyof DrawerParamList}
        component={ProfileStackNavigator}
      />
    </Drawer.Navigator>
  );
}

export default AppDrawerNavigator;
