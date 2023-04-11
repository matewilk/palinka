import * as Localization from "expo-localization";
import { Locale } from "expo-localization";
import { I18n } from "i18n-js";

import { tokens } from "./translations/tokens";
import en from "./translations/en";
import pl from "./translations/pl";

const i18n = new I18n();

i18n.translations = {
  en,
  pl,
};

const locales = Localization.getLocales();
const { languageCode } = locales[0] as Locale;

i18n.locale = languageCode || "en";
i18n.enableFallback = true;
i18n.defaultLocale = "en";

function translate(key: string, options?: any): string {
  // Check if the translation exists
  if (!i18n.translations[i18n.locale][key]) {
    // Return a fallback value or a custom message
    console.warn(`Missing translation for key: ${key}`);
    return key;
  }

  return i18n.t(key, options);
}

export { tokens, translate };
export default i18n;
