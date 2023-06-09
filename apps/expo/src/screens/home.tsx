import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { SheetManager } from "react-native-actions-sheet";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";

import TaskSelectionSheet from "../components/TaskSelectionSheet";
import { Selection } from "../types/app";
import { tokens, translate } from "../i18n";

const selection: Selection[] = [
  {
    title: translate(tokens.selection.tasks.composeParentNote.title),
    message: {
      role: "system",
      content: translate(tokens.selection.tasks.composeParentNote.content),
    },
  },
  {
    title: translate(tokens.selection.tasks.polishDocument.title),
    message: {
      role: "system",
      content: translate(tokens.selection.tasks.polishDocument.content),
    },
  },
  {
    title: translate(tokens.selection.tasks.createLessonPlan.title),
    message: {
      role: "system",
      content: translate(tokens.selection.tasks.createLessonPlan.content),
    },
  },
];

import HomeImage from "../../assets/welcome_image.svg";
import { MainStackParamList } from "../navigation/MainStackNavigator";

type HomeScreenProps = StackScreenProps<MainStackParamList, "Home">;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        <Animated.View
          entering={FadeInDown.duration(500).springify()}
          className="flex-1 items-center justify-start pt-24"
        >
          <HomeImage width={250} height={250} />

          <Animated.Text
            entering={FadeInDown.delay(100).duration(500).springify()}
            className="mt-4 p-4 pb-0 text-lg"
          >
            {translate(tokens.screens.home.helloWithName, { name: "Palinka" })}
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(200).duration(500).springify()}
            className="mt-4 px-4 text-lg"
          >
            {translate(tokens.screens.home.helloContent)}
          </Animated.Text>

          <Animated.View
            entering={FadeInUp.delay(300).duration(500).springify()}
            className="w-full flex-1 items-center justify-end pb-4"
          >
            <TouchableOpacity
              onPress={() => {
                SheetManager.show("task-selection");
              }}
              className="w-full items-center justify-center rounded-full bg-primary p-3"
            >
              <Text className="text-lg text-white">
                {translate(tokens.screens.home.selectTaskBtn)}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
      <TaskSelectionSheet
        sheetId="task-selection"
        payload={{ navigation: navigation }}
        selection={selection}
        navigationRoute="Prompt"
      />
    </SafeAreaView>
  );
};
