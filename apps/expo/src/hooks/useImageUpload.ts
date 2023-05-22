import { useState } from "react";
import * as Crypto from "expo-crypto";
import * as ImagePicker from "expo-image-picker";

import { trpc } from "../utils/trpc";

export const getFirstImage = (
  image: ImagePicker.ImagePickerResult | undefined,
): ImagePicker.ImagePickerAsset | undefined => {
  return image?.assets?.[0];
};

// Define status as a TypeScript enum
export enum UploadStatus {
  IDLE = "IDLE",
  UPLOADING = "UPLOADING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export const useImageUpload = () => {
  const [image, setImage] = useState<
    ImagePicker.ImagePickerResult | undefined
  >();
  const [status, setStatus] = useState<UploadStatus>(UploadStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: fetchPresignedUrl } = trpc.s3.getSignedUrl.useMutation();
  const { mutateAsync: detectText } = trpc.s3.detectText.useMutation();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImage(result);
    }
  };

  const uploadImage = async () => {
    setStatus(UploadStatus.UPLOADING);
    setError(null);

    try {
      const img = getFirstImage(image);
      if (img) {
        const imagePath = img.uri;
        const imageExt = img.uri.split(".").pop();
        const imageMime = `image/${imageExt}`;

        const picture = await fetch(imagePath);
        const file = await picture.blob();

        const fileUUID = Crypto.randomUUID();
        const filename = `${fileUUID}.${imageExt}`;

        const MY_SIGNED_URL = await fetchPresignedUrl({
          key: filename,
        });

        const imageData = new File([file], filename);
        const result = await fetch(MY_SIGNED_URL, {
          method: "PUT",
          body: imageData,
          headers: {
            "Content-Type": imageMime,
          },
        });

        if (result.ok) {
          const data = await detectText({ key: filename });
          setStatus(UploadStatus.COMPLETED);
          return data;
        } else {
          setError("Upload failed");
          setStatus(UploadStatus.FAILED);
        }
      }
    } catch (err) {
      setError((err as Error)?.message);
      setStatus(UploadStatus.FAILED);
    }
  };

  return { image, pickImage, uploadImage, status, error };
};
