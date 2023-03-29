import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { openaiRouter } from "./openai";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  openai: openaiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
