import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { openaiRouter } from "./openai";
import { s3Router } from "./s3";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  openai: openaiRouter,
  s3: s3Router,
});

// export type definition of API
export type AppRouter = typeof appRouter;
