import { useEffect, useState, useRef } from "react";
import { Button, View, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GiftedChat,
  Send,
  Bubble,
  IMessage,
  BubbleProps,
  SendProps,
} from "react-native-gifted-chat";
import { ActivityIndicator } from "react-native";

import { trpc } from "../utils/trpc";
import { AutoExpandingTextInput } from "../components/AutoExpandingTextInput";
import { useChatCompletion } from "../providers/ChatCompletionContextProvider";
import { tokens, translate } from "../i18n";

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
  const { chatCompletion, addMessage, isAssistant, getGiftedChatMessages } =
    useChatCompletion();

  const isFocused = useIsFocused();
  const [prompt, setPrompt] = useState("");
  const hadLoadedRef = useRef(false);
  const initialScreenEnterRef = useRef(true);

  const { mutate, data, isLoading } = trpc.openai.chatCompletion.useMutation();

  // Effect to handle the initial screen enter
  useEffect(() => {
    if (isFocused && initialScreenEnterRef.current) {
      initialScreenEnterRef.current = false;
      if (chatCompletion) {
        mutate(chatCompletion);
      }
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
  }, [chatCompletion, isFocused, data]);

  const handleSend = (messages: IMessage[] = []) => {
    messages.forEach((message) => {
      addMessage({
        role: "user",
        content: message.text,
      });
      setPrompt(message.text);
    });
  };

  const renderBubble = (props: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#f0f0f0",
          },
          right: {
            backgroundColor: "#007bff",
          },
        }}
        textStyle={{
          left: {
            color: "#000",
          },
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const renderSend = (props: SendProps<IMessage>) => {
    return (
      <Send {...props}>
        <View>
          <Button
            title={translate(tokens.screens.chat.submitBtn)}
            onPress={() => {
              props.onSend?.({ text: prompt.trim() }, true);
            }}
          />
        </View>
      </Send>
    );
  };

  const renderFooter = () => {
    if (isLoading) {
      return (
        <View
          style={{ margin: 10, alignItems: "center", justifyContent: "center" }}
          className="m-5 justify-center align-middle"
        >
          <ActivityIndicator size="small" color="#007bff" />
          <Text className="mt-5">
            {translate(tokens.screens.chat.assistantWorking)}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView className="flex-1">
      <GiftedChat
        messages={getGiftedChatMessages()}
        onSend={(messages) => handleSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderFooter={renderFooter}
        bottomOffset={20}
        text={prompt}
        onInputTextChanged={(text) => setPrompt(text)}
      />
      <SignOut />
    </SafeAreaView>
  );
};
