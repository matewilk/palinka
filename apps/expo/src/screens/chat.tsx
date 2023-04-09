import { useEffect, useState, useRef } from "react";
import { Button, Text, ScrollView, TouchableOpacity, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

import { trpc } from "../utils/trpc";
import { AutoExpandingTextInput } from "../components/AutoExpandingTextInput";
import { useChatCompletion } from "../providers/ChatCompletionContextProvider";

const SignOut = () => {
  const { signOut } = useAuth();
  return (
    <View className="w-full rounded-lg p-4">
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export const ChatScreen = () => {
  const { chatCompletion, addMessage, isAssistant } = useChatCompletion();

  const isFocused = useIsFocused();
  const [prompt, setPrompt] = useState("");
  const hadLoadedRef = useRef(false);
  const initialScreenEnterRef = useRef(true);

  const { mutate, data, isLoading } = trpc.openai.chatCompletion.useMutation();

  // Effect to handle the initial screen enter
  useEffect(() => {
    if (isFocused && initialScreenEnterRef.current) {
      initialScreenEnterRef.current = false;
      mutate(chatCompletion);
    }
  }, [isFocused]);

  // Effect to handle updates to chatCompletion
  useEffect(() => {
    if (hadLoadedRef.current && isFocused) {
      // If the user is the assistant, we don't want to trigger a mutation
      if (!isAssistant) {
        mutate(chatCompletion, {
          onSuccess: (data) => {
            // save assistant message but don't trigger a mutation (see comment above)
            addMessage({
              role: data?.message?.role as "assistant",
              content: data?.message?.content as string,
            });
          },
        });
      }
    } else {
      hadLoadedRef.current = true;
    }
  }, [chatCompletion, isFocused]);

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex h-full w-full flex-col p-4">
        {/* display result */}
        <View className="flex-1">
          <View className="flex-1 items-center justify-start px-4">
            <ScrollView className="mt-2 w-full">
              {isLoading && <Text>Loading...</Text>}
              {data && <Text>{data?.message?.content}</Text>}
            </ScrollView>
          </View>
        </View>

        {/* input */}
        <View className="h-14">
          <View className="mt-5 flex-1 items-center justify-end">
            <View className="flex w-full flex-row px-4">
              <View className="w-3/4 pr-1">
                <AutoExpandingTextInput
                  className="mb-2 rounded border-2 border-gray-500 p-2"
                  onChangeText={handlePromptChange}
                  placeholder="How can I improve the results?"
                />
              </View>
              <View className="w-1/4 pl-2">
                <TouchableOpacity
                  className="flex items-center rounded bg-blue-500 p-2"
                  onPress={() => {
                    addMessage({
                      role: "user",
                      content: prompt,
                    });
                  }}
                >
                  <Text className="font-semibold">Send</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* signout button */}
            {/* <SignOut /> */}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
