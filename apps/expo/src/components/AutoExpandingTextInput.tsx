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
      style={[props.style, { height: Math.max(5, height) }]}
      value={text}
    />
  );
};
