import { useState } from "react";
import { TextInput, TextInputProps } from "react-native";

export const AutoExpandingTextInput = (props: TextInputProps) => {
  const [text, setText] = useState<string>("");
  const [height, setHeight] = useState<number>(0);
  return (
    <TextInput
      {...props}
      multiline={true}
      testID="auto-expanding-text-input"
      onChange={(event) => {
        setText(event.nativeEvent.text);
      }}
      onContentSizeChange={(event) => {
        setHeight(event.nativeEvent.contentSize.height);
      }}
      // set max height to 40, min height to 5, othewise use calculated height
      className={`${props.className} max-h-${Math.max(
        5,
        Math.min(40, height),
      )}`}
      value={text}
    />
  );
};
