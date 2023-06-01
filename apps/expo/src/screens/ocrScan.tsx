import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";

import Logo from "../../assets/logo.svg";
import { OcrStackParamList } from "../navigation/OcrStackNavigator";
import { translate, tokens } from "../i18n";
import {
  useImageUpload,
  getFirstImage,
  isPortrait,
} from "../hooks/useImageUpload";

const screenHeight = Dimensions.get("window").height;

type OcrScanScreenProps = StackScreenProps<OcrStackParamList, "Scaner">;

export const OcrScanScreen = ({ navigation }: OcrScanScreenProps) => {
  const { image, pickImage, uploadImage, detectText, status } =
    useImageUpload();
  const [hasScanned, setHasScanned] = useState(false);

  const firstImage = getFirstImage(image);

  const isProcessing = status === "SCANNING" || status === "ANALYSING";

  const handleScan = async () => {
    setHasScanned(true);
    if (firstImage) {
      const filename = await uploadImage();
      if (filename) {
        const data = await detectText(filename);
        if (data) {
          navigation.navigate("Result", { image: firstImage, data });
        }
        setHasScanned(false);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          flexDirection: "column",
        }}
        className="h-full p-2"
      >
        <Animated.View entering={FadeInDown.duration(500).springify()}>
          <View className="items-center">
            <Logo width={100} height={30} />
          </View>
        </Animated.View>

        <Animated.View
          className="items-center"
          entering={FadeInUp.delay(300).duration(500).springify()}
        >
          {firstImage ? (
            <View className="flex items-center p-1">
              <Image
                source={{ uri: firstImage.uri }}
                style={{
                  aspectRatio: firstImage.width / firstImage.height,
                  height: isPortrait(firstImage)
                    ? screenHeight * 0.6
                    : screenHeight * 0.25,
                }}
                className="w-full rounded-xl bg-primary-lightest"
              />
            </View>
          ) : (
            <Text className="text-center text-xl">
              {translate(tokens.screens.ocrScan.subheader)}
            </Text>
          )}

          <View className="flex items-center p-1">
            <Text className="text-center text-xl">
              {hasScanned ? `${status.toLowerCase()}` : " "}
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(300).duration(500).springify()}
          className="items-center"
        >
          <Animated.View
            entering={FadeInDown.delay(200).duration(500).springify()}
            className="w-full text-lg"
          >
            <TouchableOpacity
              onPress={pickImage}
              className={`w-full items-center justify-center rounded-full bg-primary p-3 ${
                isProcessing ? "opacity-50" : ""
              }`}
              disabled={isProcessing}
            >
              <Text className="text-lg text-white">
                {translate(tokens.screens.ocrScan.selectImageBtn)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleScan}
              className={`mt-3 w-full items-center justify-center rounded-3xl p-3 ${
                !firstImage || isProcessing
                  ? "bg-primary opacity-50"
                  : "bg-primary"
              }`}
              disabled={!firstImage || isProcessing}
            >
              <Text className="text-lg text-white">
                {translate(tokens.screens.ocrScan.scanBtn)}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};
