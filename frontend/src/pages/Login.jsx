import React, { useEffect } from "react";
import api from "@services/services";
import "@styles/login.css";
import basile from "@assets/basileCarle.png";

function Login() {
  const ENDPOINT = "/users";
  useEffect(() => {
    api.get(`${ENDPOINT}`).then((result) => {
      console.error(result);
    });
  }, []);
  return (
    <div className="container">
      <div className="login-section">
        <div className="login-box">
          <div id="user-photo">
            <img
              src={basile}
              alt="Basile, l'administrateur unique de ce site"
              id="basile"
            />
          </div>
          <div id="connexion-form">
            <div id="inscription">Je souhaite m'inscrire</div>
            <form>
              <label htmlFor="login">
                <div>Login :</div>
                <div>
                  <input type="text" id="login" name="login" />
                </div>
              </label>
              <label htmlFor="password">
                <div>Mot de passe :</div>
                <div>
                  <input type="password" id="password" name="password" />
                </div>
              </label>
              <label htmlFor="submit">
                <button type="button" id="submit" className="connect-btn">
                  Se connecter
                </button>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
