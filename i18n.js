import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./public/locales/en/common.json";
import bn from "./public/locales/bn/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    bn: { translation: bn },
  },
  lng: "bn", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
