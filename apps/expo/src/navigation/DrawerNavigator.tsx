import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import MainStackNavigator from "./MainStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(props: any) {
  const { progress, ...rest } = props;

  // Function to handle logout logic
  const handleLogout = () => {
    console.log("Logout");
    // Your logout logic here
  };

  return (
    <DrawerContentScrollView {...rest} className="">
      <View>
        <DrawerItemList {...rest} />
      </View>
      <TouchableOpacity onPress={handleLogout} className="p-4">
        <Text>Logout</Text>
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
      <Drawer.Screen name="Home" component={MainStackNavigator} />
      <Drawer.Screen name="Profile" component={ProfileStackNavigator} />
    </Drawer.Navigator>
  );
}

export default AppDrawerNavigator;
