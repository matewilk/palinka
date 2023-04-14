import { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";

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
        <View className="flex flex-1 flex-col justify-between">
          <View className="items-center pt-24">
            <View className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300">
              <Text className="text-4xl font-bold text-gray-500">P</Text>
            </View>

            {/* Text */}
            <Text className="mt-4 p-4 pb-0 text-lg">
              {translate(tokens.screens.prompt.header)}
            </Text>
            <Text className="mt-4 px-4 text-lg">
              {translate(tokens.screens.prompt.subheader)}
            </Text>
          </View>

          <View className="w-full items-center justify-end pb-4">
            <AutoExpandingTextInput
              className="mb-2 w-full rounded border border-gray-500 p-2"
              onChangeText={handlePromptChange}
              placeholder={translate(tokens.screens.prompt.inputPlaceholder)}
            />
            <TouchableOpacity
              onPress={() => {
                resetUserPrompt();
                addMessage({ role: "user", content: prompt });
                navigation.navigate("Chat");
              }}
              className="mt-6 h-10 w-full items-center justify-center rounded-lg bg-blue-500"
            >
              <Text className="text-white">
                {translate(tokens.screens.prompt.submitBtn)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
