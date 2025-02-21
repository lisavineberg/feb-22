import { useTranslation } from "react-i18next";

const LanguageToggle = () => {
  const { i18n, t } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="flex gap-sm">
      <button onClick={() => changeLanguage("en")}>{t("english")}</button>
      <button data-secondary onClick={() => changeLanguage("fr")}>
        {t("french")}
      </button>
    </div>
  );
};
export default LanguageToggle;
