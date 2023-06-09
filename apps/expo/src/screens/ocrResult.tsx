import React, { useState } from "react";
import {
  View,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { SheetManager } from "react-native-actions-sheet";

import { OcrStackParamList } from "../navigation/OcrStackNavigator";
import { isPortrait } from "../hooks/useImageUpload";
import TextractResults from "../components/TextractResults";
import TaskSelectionSheet from "../components/TaskSelectionSheet";

import { Selection } from "../types/app";
import { translate, tokens } from "../i18n";

const selection: Selection[] = [
  {
    title: translate(tokens.selection.ocrTasks.editText.title),
    message: {
      role: "system",
      content: translate(tokens.selection.ocrTasks.editText.content),
    },
  },
  {
    title: translate(tokens.selection.ocrTasks.respondToText.title),
    message: {
      role: "system",
      content: translate(tokens.selection.ocrTasks.respondToText.content),
    },
  },
];

const screenHeight = Dimensions.get("window").height;

type OcrResultScreenProps = StackScreenProps<OcrStackParamList, "Result">;

export const OcrResultScreen = ({
  route,
  navigation,
}: OcrResultScreenProps) => {
  const { image, data } = route.params;
  const [parsedResults, setParsedResults] = useState<string[]>([]);

  return (
    <SafeAreaView>
      <View className="h-full p-4 pb-2 pt-2">
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
                    ? screenHeight * 0.3
                    : screenHeight * 0.2,
                  borderRadius: 8,
                }}
              />
            </View>
          )}
        </Animated.View>
        <View className="my-2 border-b border-gray-300" />
        <TextractResults results={data} onParse={setParsedResults} />
        <Animated.View
          entering={FadeInUp.delay(300).duration(500).springify()}
          className="w-full items-center justify-end pt-2"
        >
          <TouchableOpacity
            onPress={() => {
              SheetManager.show("ocr-task-selection");
            }}
            className="w-full items-center justify-center rounded-full bg-primary p-3"
          >
            <Text className="text-lg text-white">
              {translate(tokens.screens.home.selectTaskBtn)}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <TaskSelectionSheet
        sheetId="ocr-task-selection"
        payload={{ navigation: navigation }}
        selection={selection}
        navigationRoute="Prompt"
        textractResults={parsedResults.join("\n\n")}
      />
    </SafeAreaView>
  );
};
