import { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";

import { MainStackParamList } from "../navigation/MainStackNavigator";
import { AutoExpandingTextInput } from "../components/AutoExpandingTextInput";
import { useChatCompletion } from "../providers/ChatCompletionContextProvider";
import { translate, tokens } from "../i18n";

type PromptScreenProps = StackScreenProps<MainStackParamList, "Prompt">;

export const PromptScreen = ({ navigation }: PromptScreenProps) => {
  const [prompt, setPrompt] = useState("");
  const { addMessage, resetUserPrompt } = useChatCompletion();

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <Animated.View
          entering={FadeInDown.duration(500).springify()}
          className="flex flex-1 flex-col justify-between"
        >
          <View className="items-center pt-24">
            <View className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300">
              <Text className="text-4xl font-bold text-gray-500">P</Text>
            </View>

            <Animated.Text
              entering={FadeInDown.delay(100).duration(500).springify()}
              className="mt-4 p-4 pb-0 text-lg"
            >
              {translate(tokens.screens.prompt.header)}
            </Animated.Text>
            <Animated.Text
              entering={FadeInDown.delay(200).duration(500).springify()}
              className="mt-4 px-4 text-lg"
            >
              {translate(tokens.screens.prompt.subheader)}
            </Animated.Text>
          </View>

          <Animated.View
            entering={FadeInUp.delay(300).duration(500).springify()}
            className="w-full items-center justify-end pb-4"
          >
            <AutoExpandingTextInput
              className="w-full rounded border border-gray-500 p-3"
              onChangeText={handlePromptChange}
              placeholder={translate(tokens.screens.prompt.inputPlaceholder)}
            />
            <TouchableOpacity
              onPress={() => {
                resetUserPrompt();
                addMessage({ role: "user", content: prompt });
                navigation.navigate("Chat");
              }}
              className="mt-6 h-10 w-full items-center justify-center rounded-lg bg-black"
            >
              <Text className="text-lg text-white">
                {translate(tokens.screens.prompt.submitBtn)}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};
