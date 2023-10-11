import React from "react";
import { useTranslation } from "react-i18next";
import "./LanguageDropdown.css";

const LanguageDropdown = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="language-dropdown">
      <select
        className="language-select"
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
      >
        <option value="en">{t("english")}</option>
        <option value="fi">{t("finnish")}</option>
        <option value="es">{t("espanish")}</option>
      </select>
    </div>
  );
};

export default LanguageDropdown;
