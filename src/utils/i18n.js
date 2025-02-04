import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uz from "../langs/uz.json";
import ru from "../langs/ru.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            uz: { translation: uz },
            ru: { translation: ru },
        },
        lng: localStorage.getItem('lang') === 'uz' ? 'uz' : 'ru',
        fallbackLng: localStorage.getItem('lang') === 'uz' ? 'uz' : 'ru',
        interpolation: { escapeValue: false },
    });

export default i18n;
