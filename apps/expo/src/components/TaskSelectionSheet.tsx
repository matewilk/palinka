import React, { useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
} from "react-native-actions-sheet";
import { Selection } from "../types/app";
import { useChatCompletion } from "../providers/ChatCompletionContextProvider";
import { StackNavigationProp } from "@react-navigation/stack";

type SelectionButtonProps = {
  title: string;
  onPress: () => void;
};

const SelectionButton: React.FC<SelectionButtonProps> = ({
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="my-2 w-full items-center justify-center rounded-3xl border border-primary p-3"
    >
      <Text className="text-base text-primary-dark">{title}</Text>
    </TouchableOpacity>
  );
};

type TaskSelectionSheetProps = {
  sheetId: string;
  payload: {
    navigation: StackNavigationProp<any, any>;
  };
  selection: Selection[];
  navigationRoute: string;
};

const TaskSelectionSheet: React.FC<TaskSelectionSheetProps> = ({
  sheetId,
  payload,
  selection,
  navigationRoute,
}) => {
  const { addMessage, resetChatCompletion } = useChatCompletion();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { navigation } = payload;
  return (
    <ActionSheet ref={actionSheetRef} id={sheetId}>
      <View className="p-4">
        {selection.map(({ title, message }) => (
          <SelectionButton
            key={title}
            title={title}
            onPress={() => {
              resetChatCompletion();
              addMessage(message);
              SheetManager.hide(sheetId);
              navigation.navigate(navigationRoute);
            }}
          />
        ))}
      </View>
    </ActionSheet>
  );
};

export default TaskSelectionSheet;
