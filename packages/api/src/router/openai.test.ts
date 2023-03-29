import { openaiRouter } from "./openai";
import { type inferProcedureInput } from "@trpc/server";
import { createContextInner } from "../context";
import { appRouter } from "../router";
import { prisma } from "@acme/db";
import type { SignedInAuthObject } from "@clerk/nextjs/api";
import type { OpenAIApi } from "openai";

describe("openaiRouter", () => {
  it("chatCompletion", async () => {
    const auth = {
      userId: "123",
    } as SignedInAuthObject;

    const chatCompletionMock = jest.fn().mockResolvedValue({
      data: {
        choices: [{ message: { role: "assistant", content: "test" } }],
      },
    });
    const openai = {
      createChatCompletion: chatCompletionMock,
    } as unknown as OpenAIApi;

    const ctx = await createContextInner({ auth, prisma, openai });
    const caller = appRouter.createCaller(ctx);

    type Input = inferProcedureInput<typeof openaiRouter.chatCompletion>;
    const input: Input = "Hello";

    const result = await caller.openai.chatCompletion(input);

    expect(result).toMatchObject({
      message: { role: "assistant", content: "test" },
    });
  });
});
