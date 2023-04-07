import { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";

import {
  MainStackParamList,
  type Message,
} from "../navigation/MainStackNavigator";
import { AutoExpandingTextInput } from "../components/AutoExpandingTextInput";

type QuestionScreenProps = StackScreenProps<MainStackParamList, "Question">;

export const QuestionScreen = ({ navigation, route }: QuestionScreenProps) => {
  const [userMessage, setUserMessage] = useState<Message>({
    role: "user",
    content: "",
  });
  const { message } = route.params;

  const handlePromptChange = (newPrompt: string) => {
    const newMessage: Message = { role: "user", content: newPrompt };
    setUserMessage(newMessage);
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
            <Text className="mt-4 p-4 pb-0 text-lg">Great choice!</Text>
            <Text className="mt-4 px-4 text-lg">
              Just provide me with some key details or a rough draft, and I'll
              make sure your message is clear, concise, and respectful.
            </Text>
          </View>

          <View className="w-full items-center justify-end pb-4">
            <AutoExpandingTextInput
              className="mb-2 w-full rounded border-2 border-gray-500 p-2"
              onChangeText={handlePromptChange}
              placeholder="Provide a rough draft or key details here."
            />
            <TouchableOpacity
              onPress={() => {
                const messages = [message, userMessage];
                navigation.navigate("Chat", { messages });
              }}
              className="mt-6 h-10 w-32 items-center justify-center rounded-lg bg-blue-500"
            >
              <Text className="text-white">Let's Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
