import React from "react";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  return (
    <div className="services">
      <h2>{t("services.title")}</h2>
      <div>
        <p>{t("services.serviceTypes.childrenHaircut")} (€15)</p>
        <p>{t("services.serviceTypes.adultHaircut")} (€25)</p>
        <p>{t("services.serviceTypes.shaving")} (€15)</p>
        <p>{t("services.serviceTypes.hairColoring")} (€40)</p>
      </div>
    </div>
  );
};

export default Services;
