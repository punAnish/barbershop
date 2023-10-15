import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import myImage from "./home-image.png";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <h1>{t("home.welcome")}</h1>
      <p>{t("home.description")}</p>

      <Link className="booknow" to="/login">
        <button>{t("home.bookNow")}</button>
      </Link>
      <img src={myImage} alt="" />
    </div>
  );
};

export default HomePage;
