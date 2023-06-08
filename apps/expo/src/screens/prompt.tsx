import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";

import PromptImage from "../../assets/welcome_image.svg";
import { MainStackParamList } from "../navigation/MainStackNavigator";
import { AutoExpandingTextInput } from "../components/AutoExpandingTextInput";
import { useChatCompletion } from "../providers/ChatCompletionContextProvider";
import { translate, tokens } from "../i18n";

type PromptScreenProps = StackScreenProps<MainStackParamList, "Prompt">;

export const PromptScreen = ({ navigation }: PromptScreenProps) => {
  const [prompt, setPrompt] = useState("");
  const { addMessage, resetUserPrompt, getFirstUserMessage } =
    useChatCompletion();

  const firstUserMessage = getFirstUserMessage();

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          flexDirection: "column",
        }}
        className="h-full p-4 pt-2"
      >
        <Animated.View
          className={`h-1 flex-1 justify-center ${
            firstUserMessage ? "pt-0" : "pt-24"
          }`}
          entering={FadeInDown.duration(500).springify()}
        >
          <View className="items-center">
            {firstUserMessage ? (
              <ScrollView className="h-[99%]">
                <TextInput
                  value={firstUserMessage.content}
                  editable={false}
                  multiline
                />
              </ScrollView>
            ) : (
              <>
                <PromptImage width={250} height={250} />

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
              </>
            )}
          </View>
        </Animated.View>

        <Animated.View
          className="justify-end pt-2"
          entering={FadeInUp.delay(300).duration(500).springify()}
        >
          <AutoExpandingTextInput
            className="w-full rounded-full border border-gray-300 p-3"
            onChangeText={handlePromptChange}
            placeholder={translate(tokens.screens.prompt.inputPlaceholder)}
          />
          <TouchableOpacity
            onPress={() => {
              // resetUserPrompt();
              addMessage({ role: "user", content: prompt });
              navigation.navigate("Chat");
            }}
            className={`mt-4 w-full items-center justify-center rounded-3xl p-3 ${
              !prompt ? "bg-primary opacity-50" : "bg-primary"
            }`}
            disabled={!prompt}
          >
            <Text className="text-lg text-white">
              {translate(tokens.screens.prompt.submitBtn)}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};
