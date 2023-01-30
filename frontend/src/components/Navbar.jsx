import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "@services/services";
import login from "@assets/login.png";
import logout from "@assets/logout.png";
import cv from "@assets/cv.png";
import Context from "../context/Context";

function Navbar() {
  const { isConnected, setIsConnected } = useContext(Context);
  const location = useLocation();

  // cache la barre de navigation quand l'utilisateur défile
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);
  document.addEventListener("scroll", () => {
    setIsNavBarVisible(false);
    setTimeout(() => {
      setIsNavBarVisible(true);
    }, 1000);
  });

  const navigate = useNavigate();

  // Si l'utilisateur est connecté, déconnexion, sinon, direction page de login
  const handleLogin = () => {
    if (!isConnected) {
      navigate("/login");
    } else {
      api.post("/logout").then((result) => {
        console.error(result);
        setIsConnected(false);
        sessionStorage.clear("email");
        sessionStorage.clear("company");
        sessionStorage.clear("type");
        sessionStorage.clear("isConnected");
        navigate("/");
      });
    }
  };

  return (
    <div className="container">
      <div id={isNavBarVisible ? "opacity-navbar" : null} />
      <div className={isNavBarVisible ? "navbar" : "hidden-navbar"}>
        <strong className="title">
          <div id="name">
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
              onClick={handleLogin}
              onKeyDown={null}
              tabIndex="0"
            >
              <img
                src={isConnected ? logout : login}
                alt={
                  isConnected
                    ? "logout by Cetha Studio from Noun Project"
                    : "Login by Aman from Noun Project"
                }
                id="login-img"
              />
              <span>{isConnected ? "Se déconnecter" : "Se connecter"}</span>
            </div>
          </div>
        </strong>
      </div>
      <div id="spacer" />
    </div>
  );
}

export default Navbar;
