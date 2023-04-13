import React, { ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { ChatCompletionProvider } from "../../providers/ChatCompletionContextProvider";
import { ChatScreen } from "../../screens/chat";
import { TEST_ID } from "react-native-gifted-chat";

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

  it.only("should render message content", async () => {
    const { getByTestId, findByText } = render(<ChatScreen />, { wrapper });

    const WIDTH = 200; // or any number
    const HEIGHT = 2000; // or any number

    const loadingWrapper = getByTestId(TEST_ID.LOADING_WRAPPER);
    fireEvent(loadingWrapper, "layout", {
      nativeEvent: {
        layout: {
          width: WIDTH,
          height: HEIGHT,
        },
      },
    });

    const input = getByTestId("Type a message...");
    fireEvent.changeText(input, "Hello World!!");

    const sendButton = getByTestId("gf-send-btn");
    fireEvent.press(sendButton);

    expect(await findByText("Hello World!!")).toBeDefined();
  });
});
