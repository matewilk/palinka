import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";

import { tokens, translate } from "../i18n";

export const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        {/* Container for the avatar icon, text, and button */}
        <Animated.View
          entering={FadeInUp.duration(500).springify()}
          className="flex-1 items-center justify-start pt-24"
        >
          <Animated.View
            entering={FadeInUp.delay(100).duration(500).springify()}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300"
          >
            <Text className="text-4xl font-bold text-gray-500">P</Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(200).duration(500).springify()}
            className="w-full flex-1 items-center justify-center space-y-4 pt-4"
          >
            <Animated.View
              entering={FadeInDown.delay(300).duration(500).springify()}
              className="w-full items-center space-y-1"
            >
              <Text className="text-center">
                {translate(tokens.screens.profile.firstName)}
              </Text>
              <TextInput
                className="w-full rounded bg-gray-200 py-2 px-3"
                placeholder="First Name"
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(400).duration(500).springify()}
              className="w-full items-center space-y-1"
            >
              <Text className="text-center">
                {translate(tokens.screens.profile.lastName)}
              </Text>
              <TextInput
                className="w-full rounded bg-gray-200 py-2 px-3"
                placeholder="Last Name"
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(500).duration(500).springify()}
              className="w-full items-center space-y-1"
            >
              <Text className="text-center">
                {translate(tokens.screens.profile.email)}
              </Text>
              <TextInput
                className="w-full rounded bg-gray-200 py-2 px-3"
                placeholder="Email Address"
              />
            </Animated.View>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(600).duration(500).springify()}
            className="w-full flex-1 items-center justify-end pb-4"
          >
            <TouchableOpacity className="w-full items-center rounded bg-red-400 py-3">
              <Text className="text-center font-bold text-white">
                {translate(tokens.screens.profile.deleteAccountBtn)}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};
