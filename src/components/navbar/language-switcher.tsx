import type { FC } from "react";
import { useTranslation } from "react-i18next";
import "flag-icons/css/flag-icons.min.css";

interface LanguageSwitcherProps {
  className?: string;
}

const languages = [
  { code: "pt", flag: "fi fi-br" },
  { code: "es", flag: "fi fi-es" },
  { code: "en", flag: "fi fi-us" },
];

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  return (
    <div className={`flex items-center gap-2 pl-3 ${className}`}>
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
