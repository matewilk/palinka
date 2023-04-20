import React from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { TouchableOpacity, View, Text } from "react-native";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

import { translate, tokens } from "../i18n";

const SignInWithOAuth = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleSignInWithGooglePress = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        setActive?.({ session: createdSessionId });
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );

        // Example (signUp is from the signUpWithOAuth method)
        // await signUp?.update({
        //   lastName: "Doe",
        // });
        // setActive({ session, signUp.createdSessionId })
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  };

  return (
    <TouchableOpacity
      className="w-full items-center rounded-xl bg-black p-3"
      onPress={handleSignInWithGooglePress}
    >
      <Text className="text-xl text-white">
        {translate(tokens.screens.login.loginWithGoogleBtn)}
      </Text>
    </TouchableOpacity>
  );
};

export default SignInWithOAuth;
