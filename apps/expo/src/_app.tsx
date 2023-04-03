import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ClerkProvider } from "@clerk/clerk-expo";

import { TRPCProvider } from "./utils/trpc";
import { tokenCache } from "./utils/cache";
import Constants from "expo-constants";
import AppNavigator from "./navigation/AppNavigator";

export const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider
        publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <TRPCProvider>
          <SafeAreaProvider>
            <AppNavigator />
            <StatusBar />
          </SafeAreaProvider>
        </TRPCProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
};
