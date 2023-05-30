import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { DetectDocumentTextCommandOutput } from "@aws-sdk/client-textract";
import type { StackScreenProps } from "@react-navigation/stack";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import { OcrStackParamList } from "../navigation/OcrStackNavigator";

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

import { isPortrait } from "../hooks/useImageUpload";

type OcrResultScreenProps = StackScreenProps<OcrStackParamList, "Result">;

export const OcrResultScreen = ({ route }: OcrResultScreenProps) => {
  const { image, data } = route.params;

  return (
    <SafeAreaView>
      <View className="h-full p-4">
        <Animated.View
          className="items-center"
          entering={FadeInDown.duration(500).springify()}
        >
          {image && (
            <View className="flex items-center p-1">
              <Image
                source={{ uri: image.uri }}
                style={{
                  aspectRatio: image.width / image.height,
                  height: isPortrait(image)
                    ? screenHeight * 0.2
                    : screenHeight * 0.1,
                }}
                className="w-full bg-primary-lightest"
              />
            </View>
          )}
        </Animated.View>
        <Animated.ScrollView>
          <TextractResults results={data} />
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};
