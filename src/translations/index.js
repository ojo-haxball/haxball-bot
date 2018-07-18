import voca from "voca";

let lang = navigator.language || navigator.userLanguage || "en";
lang = lang.substring(0, 2);
let translations = {};

const setTranslations = t => translations = t;
const setLanguage = l => lang = l;

const _ = (name, ...variables) => {
    if (translations[name] !== undefined) {
        if (translations[name][lang]) {
            let str = translations[name][lang];
            if (variables) {
                str = voca.sprintf(str, ...variables);
            }
            return str;
        }
    }

    if (variables) {
        name = voca.sprintf(name, ...variables);
    }
    return name;
}

export { _, setTranslations, setLanguage };