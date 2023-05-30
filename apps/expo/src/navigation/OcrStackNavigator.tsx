import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { OcrResultScreen } from "../screens/ocr";
import { PickImageScreen } from "../screens/pickImage";
import { HamburgerMenu } from "./HamburgerMenu";
import { ImagePickerAsset } from "expo-image-picker";
import { DetectDocumentTextCommandOutput } from "@aws-sdk/client-textract";

export type OcrStackParamList = {
  Scaner: undefined;
  Result: {
    image: ImagePickerAsset;
    data: DetectDocumentTextCommandOutput;
  };
};

const OcrStack = createStackNavigator<OcrStackParamList>();

function OcrStackNavigator() {
  return (
    <OcrStack.Navigator
      initialRouteName="Scaner"
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        headerShown: true,
        headerRight: () => <HamburgerMenu navigation={navigation} />,
      })}
    >
      <OcrStack.Screen name="Scaner" component={PickImageScreen} />
      <OcrStack.Screen name="Result" component={OcrResultScreen} />
    </OcrStack.Navigator>
  );
}

export default OcrStackNavigator;
