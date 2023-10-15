import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import LanguageDropdown from "./LanguageDropdown";

function Navbar() {
  const { t } = useTranslation();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleClick = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Use useEffect to hide the mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header>
      <div className="container">
        <div className="navbar-content">
          <Link to="/Home">
            <h1 className="logo">{t("BarbershopMP")}</h1>
          </Link>

          <div
            className={`mobile-menu-toggle ${showMobileMenu ? "active" : ""}`}
            onClick={toggleMobileMenu}
          >
            {showMobileMenu ? "✕" : "☰"}
          </div>
        </div>

        <nav className={`nav ${showMobileMenu ? "active" : ""}`}>
          {showMobileMenu && (
            <>
              <Link to="/Home" onClick={toggleMobileMenu}>
                {t("home.title")}
              </Link>
              <Link to="/services" onClick={toggleMobileMenu}>
                {t("services.title")}
              </Link>
              <Link to="/aboutus" onClick={toggleMobileMenu}>
                {t("aboutUs.title")}
              </Link>

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
                  <Link to="/login" onClick={toggleMobileMenu}>
                    {t("navbar.login")}
                  </Link>
                  <Link to="/signup" onClick={toggleMobileMenu}>
                    {t("navbar.signup")}
                  </Link>
                </div>
              )}
              <LanguageDropdown />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
