import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "@services/services";
import login from "@assets/login.png";
import logout from "@assets/logout.png";
import cv from "@assets/cv.png";
import Context from "../context/Context";

function Navbar() {
  const { isConnected, isSubNavBarVisible, setIsSubNavBarVisible } =
    useContext(Context);

  const location = useLocation();

  // cache la barre de navigation quand l'utilisateur défile
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);
  document.addEventListener("scroll", () => {
    setIsNavBarVisible(false);
    setTimeout(() => {
      setIsNavBarVisible(true);
    }, 1000);
  });

  const handleSubNavBar = () => {
    setIsSubNavBarVisible(!isSubNavBarVisible);
  };

  // Si l'utilisateur est connecté, déconnexion, sinon, direction page de login

  return (
    <div className="container">
      <div id={isNavBarVisible ? "opacity-navbar" : null} />
      <div className={isNavBarVisible ? "navbar" : "hidden-navbar"}>
        <strong className="title">
          <div id="name-title">
            <div>
              {location.pathname === "/" ? null : (
                <>
                  <a href="/">
                    <img
                      src={cv}
                      alt="retour à la page de présentation du cv - CV by Uswa KDT from Noun Project"
                      id="cv-img"
                    />
                  </a>
                  <span>Retour au CV</span>
                </>
              )}
            </div>
            <div>
              <h1>Basile CARLE</h1>
            </div>
          </div>
          <div id="rightPart-navbar">
            <div>Développeur junior Fullstack</div>
            <div
              id="login-btn"
              role="button"
              onClick={handleSubNavBar}
              onMouseEnter={handleSubNavBar}
              onKeyDown={null}
              tabIndex="0"
            >
              <div
                className={
                  isSubNavBarVisible
                    ? "burger-line subnav-bar-opened"
                    : "burger-line"
                }
              >
                <span />
                <span />
                <span />
              </div>
              <span className="label">Cliquez pour maintenir le menu</span>
            </div>
          </div>
        </strong>
      </div>
      <div id="spacer" />
    </div>
  );
}

export default Navbar;
