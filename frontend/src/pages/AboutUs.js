import React from "react";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();

  const handleAboutUs = async (e) => {
    e.preventDefault();
  };

  return (
    <section className="aboutus" onSubmit={handleAboutUs}>
      <h2>{t("aboutUs.title")}</h2>
      <div className="aboutus">
        <p>{t("aboutUs.description")}</p>
        <iframe
          className="map"
          title={t("aboutUs.mapTitle")}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.9565302713027!2d24.92777491360426!3d60.19800227494252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692097a73098b7d%3A0xb8b8cbbcb4c2babf!2sMall%20of%20Tripla!5e0!3m2!1sen!2sfi!4v1694723744640!5m2!1sen!2sfi"
          width="600"
          height="450"
          allowFullScreen=""
          loading="lazy"
        ></iframe>

        <h2>{t("aboutUs.contactTitle")}</h2>
        <p>
          {t("aboutUs.contactInfo")} <br />
          +35866606060 <br />
          {t("aboutUs.contactText")}
        </p>
        <h2>{t("aboutUs.openingHoursTitle")}</h2>
        <p>{t("aboutUs.openingHoursText")}</p>
      </div>
    </section>
  );
};

export default AboutUs;
