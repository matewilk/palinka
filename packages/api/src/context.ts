import { prisma } from "@acme/db";
import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getAuth } from "@clerk/nextjs/server";
import type {
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/api";

import { Configuration, OpenAIApi } from "openai";
const openAiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// export for testing
export const openai = new OpenAIApi(openAiConfig);
export { prisma };

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type ContextProps = {
  auth: SignedInAuthObject | SignedOutAuthObject;
  prisma: typeof prisma;
  openai: typeof openai;
};

/** Use this helper for:
 *  - testing, where we dont have to Mock Next.js' req/res
 *  - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://beta.create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createContextInner = async ({
  auth,
  prisma,
  openai,
}: ContextProps) => {
  return {
    auth,
    prisma,
    openai,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  return await createContextInner({ auth: getAuth(opts.req), prisma, openai });
};

export type Context = inferAsyncReturnType<typeof createContext>;
