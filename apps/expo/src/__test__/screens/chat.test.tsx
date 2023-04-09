import React, { ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent } from "@testing-library/react-native";
import { ChatCompletionProvider } from "../../providers/ChatCompletionContextProvider";
import { ChatScreen } from "../../screens/chat";

jest.mock("@clerk/clerk-expo", () => ({
  useAuth: jest.fn().mockReturnValue({ isSignedIn: true }),
  getToken: jest.fn().mockImplementation(() => () => "token"),
}));

jest.mock("../../utils/trpc", () => ({
  trpc: {
    openai: {
      chatCompletion: {
        useMutation: jest.fn().mockImplementation(() => ({
          mutate: () => ({}),
          data: {
            message: {
              role: "assistant",
              content: "Hello World",
            },
          },
          isLoading: false,
        })),
      },
    },
  },
}));

describe("ChatScreen", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ChatCompletionProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </ChatCompletionProvider>
  );

  it("should render correctly", () => {
    const { toJSON } = render(<ChatScreen />, { wrapper });
    expect(toJSON()).toMatchSnapshot();
  });

  it("should render message content", () => {
    const { getByTestId, getByText } = render(<ChatScreen />, { wrapper });

    const input = getByTestId("auto-expanding-text-input");
    fireEvent.changeText(input, "Hello World");

    expect(getByText("Hello World")).toBeDefined();
  });
});
