import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export const ProfileScreen = () => {
  return (
    <SafeAreaView>
      <View className="h-full w-full p-4">
        {/* Container for the avatar icon, text, and button */}
        <View className="flex-1 items-center justify-start pt-24">
          <View className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300">
            <Text className="text-4xl font-bold text-gray-500">P</Text>
          </View>

          <View className="w-full flex-1 items-center justify-center space-y-4 pt-4">
            <View className="w-full items-center space-y-1">
              <Text className="text-center">First Name</Text>
              <TextInput
                className="w-full rounded border border-gray-300 py-2 px-3"
                placeholder="First Name"
              />
            </View>

            <View className="w-full items-center space-y-1">
              <Text className="text-center">Last Name</Text>
              <TextInput
                className="w-full rounded border border-gray-300 py-2 px-3"
                placeholder="Last Name"
              />
            </View>

            <View className="w-full items-center space-y-1">
              <Text className="text-center">Email Address</Text>
              <TextInput
                className="w-full rounded border border-gray-300 py-2 px-3"
                placeholder="Email Address"
              />
            </View>
          </View>

          <View className="w-full flex-1 items-center justify-end pb-4">
            <TouchableOpacity className="w-full items-center rounded bg-red-400 py-3">
              <Text className="text-center font-bold text-white">
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
