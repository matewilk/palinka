import { renderHook, act } from "@testing-library/react-hooks";
import {
  useChatCompletion,
  ChatCompletionProvider,
} from "./ChatCompletionContextProvider";

describe("useChatCompletion", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("should be defined", () => {
    expect(useChatCompletion).toBeDefined();
  });

  test("should throw error if used outside of provider", () => {
    const { result } = renderHook(() => useChatCompletion());
    expect(result.error).toEqual(
      Error("useChatCompletion must be used within a ChatCompletionProvider"),
    );
  });

  test("should return chatCompletion and setChatCompletion", () => {
    const { result } = renderHook(() => useChatCompletion(), {
      wrapper: ChatCompletionProvider,
    });
    expect(result.current.chatCompletion).toEqual([]);
    expect(result.current.setChatCompletion).toBeDefined();
  });

  test("should update chatCompletion", () => {
    const { result } = renderHook(() => useChatCompletion(), {
      wrapper: ChatCompletionProvider,
    });
    expect(result.current.chatCompletion).toEqual([]);

    act(() => {
      result.current.setChatCompletion([{ role: "system", content: "Hello" }]);
    });

    expect(result.current.chatCompletion).toEqual([
      { role: "system", content: "Hello" },
    ]);
  });

  test("should update chatCompletion with multiple messages", () => {
    const { result } = renderHook(() => useChatCompletion(), {
      wrapper: ChatCompletionProvider,
    });
    expect(result.current.chatCompletion).toEqual([]);

    act(() => {
      result.current.setChatCompletion([{ role: "system", content: "Hello" }]);
    });
    expect(result.current.chatCompletion).toEqual([
      { role: "system", content: "Hello" },
    ]);

    act(() => {
      result.current.setChatCompletion([
        { role: "system", content: "Hello" },
        { role: "user", content: "Hi" },
      ]);
    });
    expect(result.current.chatCompletion).toEqual([
      { role: "system", content: "Hello" },
      { role: "user", content: "Hi" },
    ]);
  });

  test("should add message to chatCompletion", () => {
    const { result } = renderHook(() => useChatCompletion(), {
      wrapper: ChatCompletionProvider,
    });
    expect(result.current.chatCompletion).toEqual([]);

    act(() => {
      result.current.addMessage({ role: "system", content: "Hello" });
    });
    expect(result.current.chatCompletion).toEqual([
      { role: "system", content: "Hello" },
    ]);
  });

  test("should reset chatCompletion", () => {
    const { result } = renderHook(() => useChatCompletion(), {
      wrapper: ChatCompletionProvider,
    });
    expect(result.current.chatCompletion).toEqual([]);

    act(() => {
      result.current.addMessage({ role: "system", content: "Hello" });
    });
    expect(result.current.chatCompletion).toEqual([
      { role: "system", content: "Hello" },
    ]);

    act(() => {
      result.current.resetChatCompletion();
    });
    expect(result.current.chatCompletion).toEqual([]);
  });

  test("should reset user prompt", () => {
    const { result } = renderHook(() => useChatCompletion(), {
      wrapper: ChatCompletionProvider,
    });
    expect(result.current.chatCompletion).toEqual([]);

    act(() => {
      result.current.addMessage({ role: "system", content: "Hello" });
      result.current.addMessage({ role: "user", content: "Hi" });
    });
    expect(result.current.chatCompletion).toEqual([
      { role: "system", content: "Hello" },
      { role: "user", content: "Hi" },
    ]);

    act(() => {
      result.current.resetUserPrompt();
    });
    expect(result.current.chatCompletion).toEqual([
      { role: "system", content: "Hello" },
    ]);
  });

  test("should return true if assistant is last message", () => {
    const { result } = renderHook(() => useChatCompletion(), {
      wrapper: ChatCompletionProvider,
    });
    expect(result.current.chatCompletion).toEqual([]);

    act(() => {
      result.current.addMessage({ role: "system", content: "Hello" });
    });
    expect(result.current.chatCompletion).toEqual([
      { role: "system", content: "Hello" },
    ]);
    expect(result.current.isAssistant).toEqual(false);

    act(() => {
      result.current.addMessage({
        role: "assistant",
        content: "Hello from assistant",
      });
    });

    expect(result.current.isAssistant).toEqual(true);
  });
});
