import React from "react";
import { View, SafeAreaView, Image } from "react-native";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";

import { ScreenIndicator } from "../components/ScreenIndicator";
import SignInWithOAuth from "../components/SignInWithOAuth";
import { translate, tokens } from "../i18n";

export const SignInSignUpScreen = () => {
  return (
    <SafeAreaView className="flex-1">
      <Animated.View
        entering={FadeInUp.duration(1000).springify()}
        exiting={FadeInUp.duration(1000).springify()}
        className="flex-1 items-center justify-end"
      >
        <Image
          className="h-64 w-64 rounded-3xl"
          source={{ uri: "https://via.placeholder.com/250" }}
        />
      </Animated.View>
      <View className="flex-1 items-center justify-center gap-3 p-5">
        <Animated.Text
          entering={FadeInDown.duration(1000).springify()}
          className="text-2xl font-extrabold"
        >
          {translate(tokens.screens.login.header)}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(200).duration(1000).springify()}
          className="text-xl text-gray-600"
        >
          {translate(tokens.screens.login.subheader)}
        </Animated.Text>
      </View>
      <Animated.View entering={FadeInUp.delay(400).duration(1000).springify()}>
        <ScreenIndicator count={3} activeIndex={2} />
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(600).duration(1000).springify()}
        className="w-full items-center p-5"
      >
        <SignInWithOAuth />
      </Animated.View>
    </SafeAreaView>
  );
};
