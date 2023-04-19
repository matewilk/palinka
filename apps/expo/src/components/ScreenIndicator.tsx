import React from "react";
import { View } from "react-native";

export const ScreenIndicator = ({
  count,
  activeIndex,
}: {
  count: number;
  activeIndex: number;
}) => {
  return (
    <View className="my-8 flex-row items-center justify-center gap-4">
      {/* create an array of length count and map over it */}
      {Array.from({ length: count }, (_, i) => (
        <View
          className={`h-2 w-2 rounded-full ${
            i === activeIndex ? "bg-black" : "bg-white"
          }`}
          key={i}
        />
      ))}
    </View>
  );
};
