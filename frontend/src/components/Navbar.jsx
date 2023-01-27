import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "@services/services";
import login from "@assets/login.png";
import logout from "@assets/logout.png";
import Context from "../context/Context";

function Navbar() {
  const { isConnected, setIsConnected } = useContext(Context);

  // cache la barre de navigation quand l'utilisateur défile
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);
  document.addEventListener("scroll", () => {
    setIsNavBarVisible(false);
    setTimeout(() => {
      setIsNavBarVisible(true);
    }, 1000);
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!isConnected) {
      navigate("/login");
    } else {
      api.post("/logout").then((result) => {
        setIsConnected(false);
        console.error(result);
      });
    }
  };

  return (
    <div className="container">
      <div id={isNavBarVisible ? "opacity-navbar" : null} />
      <div className={isNavBarVisible ? "navbar" : "hidden-navbar"}>
        <strong className="title">
          <div>
            <h1>Basile CARLE</h1>
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
