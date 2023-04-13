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
