import React, { useState } from "react";
import { Text, View, Button, Image, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { trpc } from "../utils/trpc";

export const OcrScreen = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null,
  );
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { mutateAsync: fetchPresignedUrl } = trpc.s3.getSignedUrl.useMutation();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log("Result:", result);

    if (!result.canceled) {
      setImage(result);
    }
  };

  const uploadImage = async () => {
    setLoading(true);
    setError(null);
    setText(null);

    console.log(image);

    try {
      if (image?.assets?.[0]) {
        const img = image.assets[0];

        console.log("img", img);

        const imagePath = img.uri;
        const imageExt = img.uri.split(".").pop();
        const imageMime = `image/${imageExt}`;
        const picture = await fetch(imagePath);
        const file = await picture.blob();

        const MY_SIGNED_URL = await fetchPresignedUrl({
          key: `test.${imageExt}`,
        });

        console.log("MY_SIGNED_URL", MY_SIGNED_URL);

        const imageData = new File([file], `test.${imageExt}`);
        const result = await fetch(MY_SIGNED_URL, {
          method: "PUT",
          body: imageData,
          headers: {
            "Content-Type": imageMime,
          },
        });

        setText(result.ok ? "Success" : "Failed");
        console.log("result", result);
      }
    } catch (err) {
      console.log("blah");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text>OCR</Text>
      <Button title="Pick Image" onPress={pickImage} />
      {image && (
        <View>
          <Image source={{ uri: image?.assets?.[0].uri }} />
        </View>
      )}
      {image && <Button title="Upload Image" onPress={uploadImage} />}
      {loading && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
      {text && <Text>{text}</Text>}
    </View>
  );
};
