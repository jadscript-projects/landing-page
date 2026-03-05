import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", flag: "fi fi-us" },
  { code: "pt", flag: "fi fi-br" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  return (
    <div className="flex items-center gap-2 pl-3">
      {languages.map((language) => (
        <button
          key={language.code}
          className={`cursor-pointer ${language.code === currentLanguage ? "" : "grayscale opacity-50"}`}
          onClick={() => i18n.changeLanguage(language.code)}
        >
          <span className={language.flag}></span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
