import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ImagePickerAsset } from "expo-image-picker";
import { DetectDocumentTextCommandOutput } from "@aws-sdk/client-textract";

import { OcrScanScreen } from "../screens/ocrScan";
import { OcrResultScreen } from "../screens/ocrResult";
import { HamburgerMenu } from "./HamburgerMenu";

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
      <OcrStack.Screen name="Scaner" component={OcrScanScreen} />
      <OcrStack.Screen name="Result" component={OcrResultScreen} />
    </OcrStack.Navigator>
  );
}

export default OcrStackNavigator;
