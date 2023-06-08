import React from "react";
import { Linking, Platform, Alert } from "react-native";

import { translate, tokens } from "../i18n";

const openAppSettings = () => {
  if (Platform.OS === "ios") {
    Linking.openURL("app-settings:");
  } else {
    Linking.openSettings();
  }
};

export const PermissionAlert: React.FC = () => {
  Alert.alert(
    translate(tokens.alerts.permissionRequired),
    translate(tokens.alerts.permissionRequiredMessage),
    [
      { text: translate(tokens.alerts.alertCancelBtn), style: "cancel" },
      {
        text: translate(tokens.alerts.alertOpenSettingsBtn),
        onPress: openAppSettings,
      },
    ],
  );

  return null;
};
