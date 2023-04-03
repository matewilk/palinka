import React from "react";

import {
  Button,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

import { trpc } from "../utils/trpc";

const SignOut = () => {
  const { signOut } = useAuth();
  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

const ChatCompletion: React.FC = () => {
  const [prompt, setPrompt] = React.useState("This is a test");

  const { mutate, data } = trpc.openai.chatCompletion.useMutation();

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  return (
    <View className="flex flex-col border-t-2 border-gray-500 p-4">
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2"
        onChangeText={handlePromptChange}
        placeholder="Prompt"
      />
      <TouchableOpacity
        className="rounded bg-[#cc66ff] p-2"
        onPress={() => {
          mutate(prompt);
        }}
      >
        <Text className="font-semibold">Get response</Text>
      </TouchableOpacity>

      <ScrollView className="min-h-40">
        {data && <Text className="mt-2">{data?.message?.content}</Text>}
      </ScrollView>
    </View>
  );
};
export const HomeScreen = () => {
  return (
    <SafeAreaView className="">
      <View className="h-full w-full p-4">
        <Text className="mx-auto pb-2 text-4xl font-bold">
          Your <Text className="text-[#cc66ff]">AI</Text> Assistant
        </Text>
        <ChatCompletion />
        <SignOut />
      </View>
    </SafeAreaView>
  );
};
