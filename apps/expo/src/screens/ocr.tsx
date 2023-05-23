import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { DetectDocumentTextCommandOutput } from "@aws-sdk/client-textract";

import {
  useImageUpload,
  UploadStatus,
  getFirstImage,
} from "../hooks/useImageUpload";

interface TextractResultsProps {
  results: DetectDocumentTextCommandOutput;
}

const TextractResults: React.FC<TextractResultsProps> = ({ results }) => {
  const [textLines, setTextLines] = useState<string[]>([]);

  useEffect(() => {
    if (results?.Blocks) {
      const lines = results.Blocks.filter(
        (block) => block.BlockType === "LINE",
      ).map((block) => block.Text || "");
      setTextLines(lines);
    }
  }, [results]);

  return (
    <ScrollView>
      {textLines.map((line, index) => (
        <Text key={index}>{line}</Text>
      ))}
    </ScrollView>
  );
};

const screenHeight = Dimensions.get("window").height;

export const OcrScreen = () => {
  const [textractResult, setTextractResult] =
    useState<DetectDocumentTextCommandOutput>();

  const { image, pickImage, uploadImage, status, error } = useImageUpload();

  const firstImage = getFirstImage(image);

  useEffect(() => {
    const fetchImage = async () => {
      const data = await uploadImage();
      setTextractResult(data);
    };
    if (status === UploadStatus.UPLOADING) {
      fetchImage();
    }
  }, [status]);

  return (
    <View>
      <Button title="Pick Image" onPress={pickImage} />
      {firstImage && (
        <View className="flex items-center p-1">
          <Image
            source={{ uri: firstImage.uri }}
            style={{
              aspectRatio: firstImage.width / firstImage.height,
              height: screenHeight * 0.25,
            }}
            className="w-full bg-green-200"
          />
        </View>
      )}
      {image?.assets && <Button title="Extract Text" onPress={uploadImage} />}
      {status === UploadStatus.UPLOADING && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
      {status === UploadStatus.FAILED && <Text>Upload Failed</Text>}
      {status === UploadStatus.COMPLETED && <Text>Upload Success</Text>}
      {textractResult && <TextractResults results={textractResult} />}
    </View>
  );
};
