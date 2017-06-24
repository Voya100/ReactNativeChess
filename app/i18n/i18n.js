import i18n from 'react-native-i18n';
import en from './locales/en';
import fi from './locales/fi';  

i18n.fallbacks = true;

i18n.translations = {
  en,
  fi
};

export default i18n;
