import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const openaiRouter = router({
  chatCompletion: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const completion = await ctx.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: input,
          },
        ],
      });

      return completion?.data?.choices?.[0];
    }),
});
