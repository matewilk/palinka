import React from "react";
import { View, SafeAreaView, Text, Image } from "react-native";

import SignInWithOAuth from "../components/SignInWithOAuth";
import { translate, tokens } from "../i18n";

export const SignInSignUpScreen = () => {
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
          {translate(tokens.screens.login.header)}
        </Text>
        <Text className="text-xl text-gray-600">
          {translate(tokens.screens.login.subheader)}
        </Text>
      </View>
      <View className="w-full items-center p-5">
        <SignInWithOAuth />
      </View>
    </SafeAreaView>
  );
};
