import React from "react";
import { SafeAreaView, View, Text, Button } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";

import { MainStackParamList } from "../navigation/MainStackNavigator";

type QuestionScreenProps = StackScreenProps<MainStackParamList, "Question">;

export const QuestionScreen = ({ navigation }: QuestionScreenProps) => {
  return (
    <SafeAreaView className="">
      <View className="h-full w-full p-4">
        <Text>Question Screen</Text>
        <Button
          title="Answer"
          onPress={() => {
            navigation.navigate("Chat");
          }}
        />
      </View>
    </SafeAreaView>
  );
};
