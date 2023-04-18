import React, { FC } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { AuthStackParamList } from "../navigation/AuthStackNavigator";
import { tokens, translate } from "../i18n";

type WelcomeScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

export const WelcomeScreen: FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-end">
        <Image
          className="h-64 w-64"
          source={{ uri: "https://via.placeholder.com/250" }}
        />
      </View>
      <View className="flex-1 items-center justify-center gap-10 p-5">
        <Text className="text-2xl font-extrabold">
          {translate(tokens.screens.welcome.header)}
        </Text>
        <Text className="text-xl text-gray-600">
          {translate(tokens.screens.welcome.subheader)}
        </Text>
      </View>
      <View className="w-full items-center p-5">
        <TouchableOpacity
          className="rounded-full bg-black p-5"
          onPress={() => navigation.navigate("Intro")}
        >
          <Text className="text-lg text-white">
            {translate(tokens.screens.welcome.nextBtn)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
