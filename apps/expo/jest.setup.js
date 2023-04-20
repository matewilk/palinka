jest.mock("i18n-js", () => ({
  I18n: () => {
    return {
      t: jest.fn((str) => str),
    };
  },
}));

jest.mock("expo-localization", () => {
  return {
    locales: [
      {
        countryCode: "GB",
        languageTag: "en-GB",
        languageCode: "en",
        isRTL: false,
      },
    ],
    getLocales: () => [
      {
        countryCode: "GB",
        languageTag: "en-GB",
        languageCode: "en",
        isRTL: false,
      },
    ],
    Locale: {
      countryCode: "GB",
      languageTag: "en-GB",
      languageCode: "en",
      isRTL: false,
    },
  };
});

// react-native-reanimated jest issue workaround
// https://github.com/software-mansion/react-native-reanimated/issues/3125
global.ReanimatedDataMock = {
  now: () => 0,
};
