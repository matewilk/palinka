import { useRef } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";

import ActionSheet, {
  ActionSheetRef,
  SheetProps,
  SheetManager,
} from "react-native-actions-sheet";

const selection = [
  {
    title: "Compose Parent Note",
    message: { role: "system", content: "What is the purpose of this note?" },
  },
  {
    title: "Polish Document",
    message: {
      role: "system",
      content: "What is the purpose of this document?",
    },
  },
  {
    title: "Create Lesson Plan",
    message: {
      role: "system",
      content: "What is the purpose of this lesson plan?",
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
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { navigation } = payload;
  return (
    <ActionSheet ref={actionSheetRef} id={sheetId}>
      <View className="p-4">
        <View>
          {selection.map(({ title, message }) => (
            <Selection
              title={title}
              onPress={() => {
                navigation.navigate("Question", { message });
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
          <Text className="mt-4 p-4 pb-0 text-lg">Hey, I'm Palinka!</Text>
          <Text className="mt-4 px-4 text-lg">
            Let me help you with communication, documents, and learning. Let's
            make things easier together!
          </Text>

          {/* Rounded button */}
          <View className="flex-1 items-center justify-end pb-4">
            <TouchableOpacity
              onPress={() => {
                SheetManager.show("1");
              }}
              className="mt-6 h-10 w-32 items-center justify-center rounded-lg bg-blue-500"
            >
              <Text className="text-white">Please Ask</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TaskSelectionSheet sheetId="1" payload={{ navigation: navigation }} />
    </SafeAreaView>
  );
};
