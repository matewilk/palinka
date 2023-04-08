import { router, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
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

const Message = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

const Completion = z.array(Message);

export const openaiRouter = router({
  chatCompletion: protectedProcedure
    .input(Completion)
    .mutation(async ({ ctx, input }) => {
      try {
        const completion = await ctx.openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: input,
        });

        return (
          completion?.data?.choices?.[0] || {
            message: { role: "assistant", content: "" },
          }
        );
      } catch (error: unknown) {
        if (isAPIError(error)) {
          const { message } = error;
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `An error occurred while processing the OpenAI API request: ${message}`,
            // optional: pass the original error to retain stack trace
            cause: error, // log to a monitoring tool
          });
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `An error occurred while processing the request: ${
              (error as Error).message
            }`,
            // optional: pass the original error to retain stack trace
            // cause: error, log to a monitoring tool
          });
        }
      }
    }),
});
