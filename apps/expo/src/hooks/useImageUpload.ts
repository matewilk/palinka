import { useState } from "react";
import * as Crypto from "expo-crypto";
import * as ImagePicker from "expo-image-picker";
import { Linking, Platform, Alert } from "react-native";

import { trpc } from "../utils/trpc";
import { translate, tokens } from "../i18n";

export const getFirstImage = (
  image: ImagePicker.ImagePickerResult | undefined,
): ImagePicker.ImagePickerAsset | undefined => {
  return image?.assets?.[0];
};

export const isPortrait = (image: ImagePicker.ImagePickerAsset): boolean => {
  return image.width < image.height;
};

export enum UploadStatus {
  IDLE = "IDLE",
  SCANNING = "SCANNING",
  ANALYSING = "ANALYSING",
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
  const { mutateAsync: detectTextMutation } = trpc.s3.detectText.useMutation();

  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const pickImage = async () => {
    // Reset status and error states
    setStatus(UploadStatus.IDLE);
    setError(null);

    // Request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      setError(translate(tokens.alerts.missingLibraryPermission));
      setStatus(UploadStatus.FAILED);
      Alert.alert(
        translate(tokens.alerts.permissionRequired),
        translate(tokens.alerts.permissionRequiredMessage),
        [
          { text: translate(tokens.alerts.alertCancelBtn), style: "cancel" },
          {
            text: translate(tokens.alerts.alertOpenSettingsBtn),
            onPress: openAppSettings,
          },
        ],
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!result.canceled) {
        setImage(result);
      }
    } catch (err) {
      setError((err as Error)?.message);
      setStatus(UploadStatus.FAILED);
    }
  };

  const uploadImage = async () => {
    setStatus(UploadStatus.SCANNING);
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
          setStatus(UploadStatus.COMPLETED);
          return filename;
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

  const detectText = async (filename: string) => {
    setStatus(UploadStatus.ANALYSING);
    setError(null);

    try {
      const data = await detectTextMutation({ key: filename });

      if (data) {
        setStatus(UploadStatus.COMPLETED);
        return data;
      } else {
        setError("Analysis failed");
        setStatus(UploadStatus.FAILED);
      }
    } catch (err) {
      setError((err as Error)?.message);
      setStatus(UploadStatus.FAILED);
    }
  };

  return { image, pickImage, uploadImage, detectText, status, error };
};
