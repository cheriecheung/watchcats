import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locale/en.js";
import nl from "./locale/nl.js";

const detectorOptions = {
  // order and from where user language should be detected
  order: ["querystring", "cookie", "localStorage"],

  // keys or params to lookup language from
  lookupQuerystring: "lang",
  lookupCookie: "lang",

  // cache user language on
  caches: ["cookie"],
  excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: "myDomain",

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // only detect languages that are in the whitelist
  checkWhitelist: true,
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translations: en },
      nl: { translations: nl },
    },
    fallbackLng: "en",
    lng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
    detection: detectorOptions,
    interpolation: {
      // not needed for react as it escapes by default
      escapeValue: false,
    },

    // react 18next configurations properties object
    react: {
      wait: true,
    },
  });

export default i18n;
