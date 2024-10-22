import { configureLocalization } from '@lit/localize';

const sourceLocale = 'en';
const targetLocales = ['es'] as const;
export const allLocales = [sourceLocale, ...targetLocales] as const;

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: locale => import(`./generated/${locale}.ts`),
});

/**
 * Derives the active locale from the url and applies the locale
 * if a file is found. Defaults to using english defaults if locale
 * not found or if there was an error loading the translated file.
 */
// eslint-disable-next-line no-async-promise-executor
export const localizeService = () =>
  new Promise(async (res, rej) => {
    try {
      // derive the language code from the beginning of the url.
      const languageCode =
        new URL(window.location.href)?.pathname.split('/')?.[1] ?? 'en';
      // check if the language code is known to us.
      if (targetLocales.includes(languageCode as any)) {
        console.log(languageCode)
        await setLocale(languageCode);
        res(null);
      } else {
        // resolve the promise if no valid locale target
        // default
        res(null);
      }
    } catch (e) {
      console.log(e);
      rej(e);
    }
  });
