import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import {
  TextractClient,
  DetectDocumentTextCommand,
} from "@aws-sdk/client-textract";

import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const s3Router = router({
  getSignedUrl: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { key } = input;
      const { s3 } = ctx;

      const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      });

      return await getSignedUrl(s3, putObjectCommand, {
        expiresIn: 60, // seconds
      });
    }),

  deleteS3Object: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { key } = input;
      const { s3 } = ctx;

      const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
      });

      return await s3.send(deleteObjectCommand);
    }),

  detectText: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { key } = input;

      const detectTextCommand = new DetectDocumentTextCommand({
        Document: {
          S3Object: {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Name: key,
          },
        },
      });

      const client = new TextractClient({
        region: process.env.AWS_S3_BUCKET_REGION,
      });

      const result = await client.send(detectTextCommand);

      // delete the file after text is extracted
      const caller = await s3Router.createCaller(ctx);
      caller.deleteS3Object({ key });

      return result;
    }),
});
