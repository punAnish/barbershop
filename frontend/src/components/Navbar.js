import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import LanguageDropdown from "./LanguageDropdown";
import { FaSignInAlt, FaUser } from "react-icons/fa";

function Navbar() {
  const { t } = useTranslation();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/Home">
          <h1 className="logo">{t("BarbershopMP")}</h1>
        </Link>

        <nav className="nav">
          <div className="nav-link">
            <Link to="/Home">{t("home.title")}</Link>
            <Link to="/services">{t("services.title")}</Link>
            <Link to="/aboutus"> {t("aboutUs.title")}</Link>
          </div>
          {user && (
            <div>
              <span>{user.email}</span>
              <button
                onClick={handleClick}
                style={{ backgroundColor: "gray", padding: "5px" }}
              >
                {t("navbar.logout")}
              </button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">
                <FaSignInAlt />
                {t("navbar.login")}
              </Link>
              <Link to="/signup">
                {" "}
                <FaUser />
                {t("navbar.signup")}
              </Link>
            </div>
          )}
          <LanguageDropdown />
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
