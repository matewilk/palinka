import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GiftedChat,
  Send,
  Bubble,
  IMessage,
  BubbleProps,
  SendProps,
  InputToolbar,
} from "react-native-gifted-chat";
import { ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { trpc } from "../utils/trpc";
import { useChatCompletion } from "../providers/ChatCompletionContextProvider";
import { tokens, translate } from "../i18n";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ChatScreen = () => {
  const { chatCompletion, addMessage, isAssistant, getGiftedChatMessages } =
    useChatCompletion();

  const isFocused = useIsFocused();
  const [prompt, setPrompt] = useState("");

  const { mutate, data, isLoading } = trpc.openai.chatCompletion.useMutation();

  // When first screen enters, mutete to send a request to OpenAI
  useEffect(() => {
    if (isFocused && !isAssistant) {
      mutate(chatCompletion, {
        onSuccess: (data) =>
          addMessage({
            role: "assistant",
            content: data.message?.content as string,
          }),
      });
    }
  }, [isFocused, data]);

  // When the user sends a message, mutate to send a request to OpenAI
  const handleSend = (messages: IMessage[] = []) => {
    messages.forEach((message) => {
      addMessage({
        role: "user",
        content: message.text,
      });
      mutate(chatCompletion);
    });
  };

  const renderBubble = (props: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#fff",
            padding: 3,
            // width: "90%",
          },
          right: {
            backgroundColor: "#6B4EFF",
            padding: 3,
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

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        testID="gf-input-toolbar"
        containerStyle={{
          borderRadius: 30,
        }}
      />
    );
  };

  const renderSend = (props: SendProps<IMessage>) => {
    return (
      <Send {...props}>
        <TouchableOpacity
          testID="gf-send-btn"
          className="h-full rounded-r-3xl bg-primary py-2 px-4"
          onPress={() => props.onSend?.({ text: prompt.trim() }, true)}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
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
          <ActivityIndicator size="small" color="#6B4EFF" />
          <Text className="mt-5">
            {translate(tokens.screens.chat.assistantWorking)}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <GiftedChat
      messages={getGiftedChatMessages()}
      onSend={(messages) => handleSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      renderInputToolbar={renderInputToolbar}
      renderSend={renderSend}
      renderFooter={renderFooter}
      bottomOffset={20}
      text={prompt}
      onInputTextChanged={(text) => setPrompt(text)}
      renderAvatar={() => null}
      placeholder={
        process.env.NODE_ENV === "test"
          ? "test-chat-input-placeholder"
          : translate(tokens.screens.chat.inputPlaceholder)
      }
    />
  );
};
