import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";

import { MainStackParamList } from "../navigation/MainStackNavigator";

type HomeScreenProps = StackScreenProps<MainStackParamList, "Home">;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        {/* Container for the avatar icon, text, and button */}
        <View className="flex-1 items-center justify-start pt-24">
          {/* Rounded avatar icon */}
          {/* <Image
            source={{ uri: "https://your-avatar-url-here" }}
            className="h-24 w-24 rounded-full"
          /> */}
          <View className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300">
            <Text className="text-4xl font-bold text-gray-500">P</Text>
          </View>

          {/* Text */}
          <Text className="mt-4 p-4 pb-0 text-lg">Hey, I'm Palinka!</Text>
          <Text className="mt-4 px-4 text-lg">
            Let me help you with communication, documents, and learning. Let's
            make things easier together!
          </Text>

          {/* Rounded button */}
          <View className="flex-1 items-center justify-end pb-4">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Question");
              }}
              className="mt-6 h-10 w-32 items-center justify-center rounded-lg bg-blue-500"
            >
              <Text className="text-white">Please Ask</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
