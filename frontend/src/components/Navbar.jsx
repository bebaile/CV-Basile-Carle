import React, { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "@services/services";
import login from "@assets/login.png";
import logout from "@assets/logout.png";
import admin from "@assets/admin.png";
import appointments from "@assets/appointment.png";
import cv from "@assets/cv.png";
import Context from "../context/Context";

function Navbar({ isApointmentDisplayed, setIsApointmentDisplayed }) {
  const {
    isConnected,
    setIsConnected,
    isSubNavBarVisible,
    setIsSubNavBarVisible,
  } = useContext(Context);

  const location = useLocation();
  const navigate = useNavigate();

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

  const handleDisconnect = () => {
    api.post("/logout").then((result) => {
      setIsConnected(false);
      console.error(result);
      sessionStorage.clear("email");
      sessionStorage.clear("company");
      sessionStorage.clear("type");
      sessionStorage.clear("isConnected");
      navigate("/");
      return { isConnected: false };
    });
  };

  const displayApointment = () => {
    setIsApointmentDisplayed(!isApointmentDisplayed);
  };

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
        <div
          id="sub-navbar"
          className={isSubNavBarVisible ? null : "hidden-navbar"}
        >
          <ul id="sub-navbar-list">
            <li>
              {isConnected ? (
                <div
                  role="button"
                  onClick={handleDisconnect}
                  onKeyDown={null}
                  tabIndex="0"
                >
                  <img
                    src={logout}
                    alt="logout by Cetha Studio from Noun Project"
                  />
                  Se déconnecter
                </div>
              ) : (
                <Link to="/login">
                  <img src={login} alt="Login by Aman from Noun Project" />
                  Se connecter / créer un compte
                </Link>
              )}
            </li>
            {sessionStorage.getItem("type") === "admin" ? (
              <li>
                <Link to="/admin">
                  <img src={admin} alt="admin by LAFS from Noun Project" />
                  Page d'administration
                </Link>
              </li>
            ) : null}

            <li>
              <div
                role="button"
                onClick={displayApointment}
                onKeyDown={null}
                tabIndex="0"
              >
                <img
                  src={appointments}
                  alt="appointment by 4B Icons from Noun Project"
                />
                Prendre rendez-vous{" "}
              </div>
            </li>
          </ul>
          <div
            className="close-btn"
            role="button"
            onClick={handleSubNavBar}
            onKeyDown={null}
            tabIndex="0"
          >
            <div>x</div>
          </div>
        </div>
      </div>
      <div id="spacer" />
      <div
        id={
          sessionStorage.getItem("type") === "admin"
            ? "sub-navbar-bgd-2"
            : "sub-navbar-bgd"
        }
        className={isSubNavBarVisible ? null : "hidden-navbar"}
      />
    </div>
  );
}

export default Navbar;
