import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

import { IMessage } from "react-native-gifted-chat";

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
  timestamp?: Date;
};

export type ChatCompletionContextType = {
  chatCompletion: Message[];
  setChatCompletion: Dispatch<SetStateAction<Message[]>>;
  addMessage: ({ role, content }: Message) => void;
  resetChatCompletion: () => void;
  resetUserPrompt: () => void;
  getFirstUserMessage: () => Message | undefined;
  isAssistant: boolean;
  getGiftedChatMessages: () => IMessage[];
};

export const ChatCompletionContext = createContext<
  ChatCompletionContextType | undefined
>(undefined);

export const ChatCompletionProvider = (props: PropsWithChildren) => {
  const [chatCompletion, setChatCompletion] = useState<Message[]>([]);

  const addMessage = ({ role, content }: Omit<Message, "timestamp">) => {
    const newMessage: Message = { role, content, timestamp: new Date() };
    setChatCompletion((prevChatCompletion) => [
      ...prevChatCompletion,
      newMessage,
    ]);
  };

  const resetChatCompletion = () => {
    setChatCompletion([]);
  };

  const resetUserPrompt = () => {
    setChatCompletion((prevChatCompletion) =>
      prevChatCompletion.filter((message) => message.role === "system"),
    );
  };

  const getFirstUserMessage = (): Message | undefined => {
    return chatCompletion.find((message) => message.role === "user");
  };

  const isAssistant =
    chatCompletion[chatCompletion.length - 1]?.role === "assistant";

  const getGiftedChatMessages = (): IMessage[] => {
    return chatCompletion
      .filter((message) => message.role !== "system")
      .map((message) => {
        return {
          _id: Math.random().toString(),
          text: message.content,
          createdAt: message.timestamp || new Date(),
          user: {
            _id: message.role === "user" ? 1 : 2,
            name: message.role === "user" ? "You" : "Assistant",
            avatar:
              message.role === "user"
                ? "https://placeimg.com/140/140/any"
                : "https://placeimg.com/140/140/any",
          },
        };
      })
      .reverse();
  };

  return (
    <ChatCompletionContext.Provider
      value={{
        chatCompletion,
        setChatCompletion,
        addMessage,
        resetChatCompletion,
        resetUserPrompt,
        getFirstUserMessage,
        isAssistant,
        getGiftedChatMessages,
      }}
      {...props}
    />
  );
};

export const useChatCompletion = () => {
  const context = useContext(ChatCompletionContext);
  if (!context) {
    throw new Error(
      "useChatCompletion must be used within a ChatCompletionProvider",
    );
  }

  return context;
};
