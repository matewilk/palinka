import { postRouter } from "./post";
import { type inferProcedureInput } from "@trpc/server";
import { createContextInner } from "../context";
import { appRouter } from "../router";
import { prisma } from "@acme/db";
import type { SignedInAuthObject } from "@clerk/nextjs/api";
import type { OpenAIApi } from "openai";

jest.mock("@acme/db", () => ({
  prisma: {
    post: {
      findFirst: jest.fn().mockResolvedValue({ post: "test" }),
    },
  },
}));

describe("postRouter", () => {
  it("byId", async () => {
    const auth = {
      userId: "123",
    } as SignedInAuthObject;

    const openai = {} as unknown as OpenAIApi;

    const ctx = await createContextInner({ auth, prisma, openai });
    const caller = appRouter.createCaller(ctx);

    type Input = inferProcedureInput<typeof postRouter.byId>;
    const input: Input = "1";

    const result = await caller.post.byId(input);

    expect(result).toMatchObject({ post: "test" });
  });
});
