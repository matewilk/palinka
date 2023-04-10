import { useRef } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
  SheetManager,
} from "react-native-actions-sheet";

import { tokens, translate } from "../i18n";
import {
  useChatCompletion,
  Message,
} from "../providers/ChatCompletionContextProvider";

type Selection = {
  title: string;
  message: Message;
};

const selection: Selection[] = [
  {
    title: "Compose Parent Note",
    message: {
      role: "system",
      content:
        "You are an expert kindergarden teacher with passion for teaching and respectfully communicating with parents. You'll be creating messages or notes for parents.",
    },
  },
  {
    title: "Polish Document",
    message: {
      role: "system",
      content:
        "You are an expert in editing and proofreading documents and messages and you want to help ensure that the message is clear and concise by editing a provided message.",
    },
  },
  {
    title: "Create Lesson Plan",
    message: {
      role: "system",
      content:
        "You are an expert in creating lesson plans for children and kids and also for kids and children with special needs. You will be providing a creative lesson plan for a teacher to use in their classroom.",
    },
  },
];

const Selection = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mt-4 h-10 w-full items-center justify-center rounded-lg border"
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const TaskSelectionSheet = ({ sheetId, payload }: SheetProps) => {
  const { addMessage, resetChatCompletion } = useChatCompletion();

  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { navigation } = payload;
  return (
    <ActionSheet ref={actionSheetRef} id={sheetId}>
      <View className="p-4">
        <View>
          {selection.map(({ title, message }) => (
            <Selection
              key={title}
              title={title}
              onPress={() => {
                resetChatCompletion();
                addMessage(message);
                navigation.navigate("Question");
              }}
            />
          ))}
        </View>
      </View>
    </ActionSheet>
  );
};

import { MainStackParamList } from "../navigation/MainStackNavigator";

type HomeScreenProps = StackScreenProps<MainStackParamList, "Home">;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        {/* Container for the avatar icon, text, and button */}
        <View className="flex-1 items-center justify-start pt-24">
          <View className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300">
            <Text className="text-4xl font-bold text-gray-500">P</Text>
          </View>

          {/* Text */}
          <Text className="mt-4 p-4 pb-0 text-lg">
            {translate(tokens.screens.home.helloWithName, { name: "Palinka" })}
          </Text>
          <Text className="mt-4 px-4 text-lg">
            Let me help you with communication, documents, and learning. Let's
            make things easier together!
          </Text>

          {/* Rounded button */}
          <View className="flex-1 items-center justify-end pb-4">
            <TouchableOpacity
              onPress={() => {
                SheetManager.show("task-selection");
              }}
              className="mt-6 h-10 w-32 items-center justify-center rounded-lg bg-blue-500"
            >
              <Text className="text-white">
                {translate(tokens.screens.home.selectTaskBtn)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TaskSelectionSheet
        sheetId="task-selection"
        payload={{ navigation: navigation }}
      />
    </SafeAreaView>
  );
};
