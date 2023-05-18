import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const s3Router = router({
  getSignedUrl: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { key } = input;
      const { s3 } = ctx;

      // console.log("BAIHKSJFKJSDFKJDSFK", process.env.AWS_S3_BUCKET_NAME);

      const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      });

      return await getSignedUrl(s3, putObjectCommand, {
        expiresIn: 60, // seconds
      });
    }),
});
