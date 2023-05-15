import React, { FC } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";

import { ScreenIndicator } from "../components/ScreenIndicator";
import { AuthStackParamList } from "../navigation/AuthStackNavigator";
import { tokens, translate } from "../i18n";

type IntroScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList>;
};

export const IntroScreen: FC<IntroScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Animated.View
          entering={FadeInUp.duration(1000).springify()}
          className="flex-1 items-center justify-between"
        >
          <Text className="pt-20 text-2xl font-extrabold">
            pal<Text className="text-primary">inka</Text>
          </Text>
          <Image
            className="h-64 w-64 rounded-sm"
            source={{ uri: "https://via.placeholder.com/250" }}
          />
        </Animated.View>
      </View>

      <View className="flex-1">
        <View className="flex-1 items-center justify-end gap-10 p-5">
          <Animated.Text
            entering={FadeInDown.duration(1000).springify()}
            className="text-2xl font-extrabold"
          >
            {translate(tokens.screens.intro.header)}
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="text-xl text-gray-600"
          >
            {translate(tokens.screens.intro.subheader)}
          </Animated.Text>
        </View>
        <Animated.View
          entering={FadeInUp.delay(400).duration(1000).springify()}
        >
          <ScreenIndicator count={3} activeIndex={1} />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
          className="w-full items-center p-5"
        >
          <TouchableOpacity
            className="w-full items-center rounded-3xl bg-primary p-3"
            onPress={() => navigation.navigate("Login")}
          >
            <Text className="text-lg text-white">
              {translate(tokens.screens.intro.nextBtn)}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};
