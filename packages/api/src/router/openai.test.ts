import { openaiRouter } from "./openai";
import { type inferProcedureInput } from "@trpc/server";
import { createContextInner } from "../context";
import { appRouter } from "../router";
import { prisma } from "@acme/db";
import type { SignedInAuthObject } from "@clerk/nextjs/api";
import type { OpenAIApi } from "openai";

describe("openaiRouter", () => {
  describe("chatCompletion", () => {
    let chatCompletionMock: jest.Mock;
    const auth = {
      userId: "123",
    } as SignedInAuthObject;
    let openai: OpenAIApi;

    beforeEach(() => {
      chatCompletionMock = jest.fn().mockResolvedValue({
        data: {
          choices: [{ message: { role: "assistant", content: "test" } }],
        },
      });
      openai = {
        createChatCompletion: chatCompletionMock,
      } as unknown as OpenAIApi;
    });

    it("should return data", async () => {
      const ctx = await createContextInner({ auth, prisma, openai });
      const caller = appRouter.createCaller(ctx);

      type Input = inferProcedureInput<typeof openaiRouter.chatCompletion>;
      const input: Input = "Hello";

      const result = await caller.openai.chatCompletion(input);

      expect(result).toMatchObject({
        message: { role: "assistant", content: "test" },
      });
    });

    it("should return generic error when something goes wrong", async () => {
      chatCompletionMock.mockRejectedValue(new Error("test"));

      const ctx = await createContextInner({ auth, prisma, openai });
      const caller = appRouter.createCaller(ctx);

      type Input = inferProcedureInput<typeof openaiRouter.chatCompletion>;
      const input: Input = "Hello";

      await expect(caller.openai.chatCompletion(input)).rejects.toThrowError(
        "An error occurred while processing the request: test",
      );
    });

    it("should return API error when something goes wrong", async () => {
      chatCompletionMock.mockRejectedValue({
        status: 400,
        code: "test code",
        message: "test message",
      });

      const ctx = await createContextInner({ auth, prisma, openai });
      const caller = appRouter.createCaller(ctx);

      type Input = inferProcedureInput<typeof openaiRouter.chatCompletion>;
      const input: Input = "Hello";

      await expect(caller.openai.chatCompletion(input)).rejects.toThrowError(
        "An error occurred while processing the OpenAI API request: test message",
      );
    });
  });
});
