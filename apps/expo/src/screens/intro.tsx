import React, { FC } from "react";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { AuthStackParamList } from "../navigation/AuthStackNavigator";
import { translate, tokens } from "../i18n";

type IntroScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

export const IntroScreen: FC<IntroScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center gap-10 p-5">
        <Text className="text-2xl font-extrabold">
          {translate(tokens.screens.intro.header)}
        </Text>
        <Text className="text-xl text-gray-600">
          {translate(tokens.screens.intro.subheader)}
        </Text>
      </View>
      <View className="w-full items-center p-5">
        <TouchableOpacity
          className="rounded-full bg-black p-5"
          onPress={() => navigation.navigate("Login")}
        >
          <Text className="text-2xl text-white">
            {translate(tokens.screens.intro.nextBtn)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
