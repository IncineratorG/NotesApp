import {useCallback} from 'react';
import translations from '../../../assets/translations';

const useTranslation = () => {
  const appTranslations = translations;

  const currentLanguageCode = 'ru';

  const t = useCallback(
    pattern => {
      if (
        appTranslations &&
        appTranslations.translationsMap &&
        appTranslations.translationsMap[currentLanguageCode] &&
        appTranslations.translationsMap[currentLanguageCode][pattern]
      ) {
        return appTranslations.translationsMap[currentLanguageCode][pattern];
      }

      return '';
    },
    [appTranslations, currentLanguageCode],
  );

  return {t, language: currentLanguageCode};
};

export default useTranslation;
