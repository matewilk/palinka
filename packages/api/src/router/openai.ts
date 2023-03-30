import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

// Type guard function to check if the error object is an API error
const isAPIError = (
  error: unknown,
): error is {
  status: number;
  code: string;
  message: string;
  details?: unknown;
} => {
  if (typeof error === "object" && error !== null) {
    return "status" in error && "code" in error && "message" in error;
  }
  return false;
};

export const openaiRouter = router({
  chatCompletion: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        const completion = await ctx.openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: input,
            },
          ],
        });

        return (
          completion?.data?.choices?.[0] || [
            { message: { role: "assistant", content: "" } },
          ]
        );
      } catch (error: unknown) {
        if (isAPIError(error)) {
          const { status, code, message } = error;
          return {
            status,
            code,
            message: `An error occurred while processing the OpenAI API request: ${message}`,
          };
        } else {
          return {
            status: "error",
            message: `An error occurred while processing the request: ${
              (error as Error).message
            }`,
          };
        }
      }
    }),
});
