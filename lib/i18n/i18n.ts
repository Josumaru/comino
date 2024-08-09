import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import en from "@/locales/en.json";
import id from "@/locales/id.json";
import jp from "@/locales/jp.json";

export const deviceLanguage = getLocales()?.[0].languageCode ?? "en";

export const i18n = new I18n({
  en,
});

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;

i18n.defaultLocale = deviceLanguage;
i18n.locale = deviceLanguage;

export function changeLanguage(lang: string) {
 i18n.locale = lang;
}
