import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatCompletionContextType = {
  chatCompletion: Message[];
  setChatCompletion: Dispatch<SetStateAction<Message[]>>;
  addMessage: ({ role, content }: Message) => void;
  resetChatCompletion: () => void;
  resetUserPrompt: () => void;
};

export const ChatCompletionContext = createContext<
  ChatCompletionContextType | undefined
>(undefined);

export const ChatCompletionProvider = (props: PropsWithChildren) => {
  const [chatCompletion, setChatCompletion] = useState<Message[]>([]);

  const addMessage = ({ role, content }: Message) => {
    const newMessage: Message = { role, content };
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
      prevChatCompletion.filter((message) => message.role !== "user"),
    );
  };

  return (
    <ChatCompletionContext.Provider
      value={{
        chatCompletion,
        setChatCompletion,
        addMessage,
        resetChatCompletion,
        resetUserPrompt,
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
