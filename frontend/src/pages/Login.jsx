import React, { useState } from "react";
import api from "@services/services";
import "@styles/login.css";
import basile from "@assets/basileCarle.png";

function Login() {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [arePasswordEqual, setArePasswordEqual] = useState(true);

  //   const ENDPOINT = "/users";
  //   useEffect(() => {
  //     api.get(`${ENDPOINT}`).then((result) => {
  //       console.error(result);
  //     });
  //   }, []);

  const handleClick = () => {
    setIsSubscribing(!isSubscribing);
    setArePasswordEqual(true);
  };

  const handleSubmit = () => {
    if (
      document.querySelector("#password").value !==
      document.querySelector("#confirmed-password").value
    ) {
      setArePasswordEqual(false);
      document.querySelector("#inscription").innerHTML =
        "<span style='color:red'>Mots de passes différents</span>";
    } else {
      api
        .post("/users", {
          username: document.querySelector("#login").value,
          email: document.querySelector("#email").value,
          password: document.querySelector("#password").value,
          company: document.querySelector("#company").value,
        })
        .then((result) => {
          console.error(result);
        });
    }
  };

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
            <div
              id="inscription"
              role="button"
              onClick={handleClick}
              onKeyDown={handleClick}
              tabIndex="0"
            >
              {isSubscribing
                ? "> Je suis déjà inscrit"
                : "> Je souhaite m'inscrire"}
            </div>
            <form>
              <label htmlFor="login">
                <div>Login :</div>
                <div>
                  <input type="text" id="login" name="login" />
                </div>
              </label>
              {isSubscribing ? (
                <div>
                  <label htmlFor="email">
                    <div>Courriel :</div>
                    <div>
                      <input type="text" id="email" name="email" />
                    </div>
                  </label>
                  <label htmlFor="company">
                    <div>Entreprise :</div>
                    <div>
                      <input type="text" id="company" name="company" />
                    </div>
                  </label>
                </div>
              ) : null}
              <label htmlFor="password">
                <div>Mot de passe :</div>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={arePasswordEqual ? null : "incorrect"}
                  />
                </div>
              </label>
              {isSubscribing ? (
                <label htmlFor="confirmed-password">
                  <div>Confirmation :</div>
                  <div>
                    <input
                      type="password"
                      id="confirmed-password"
                      name="confirmed-password"
                      className={arePasswordEqual ? null : "incorrect"}
                    />
                  </div>
                </label>
              ) : null}

              <label htmlFor="submit">
                <button
                  type="button"
                  id="submit"
                  className="connect-btn"
                  onClick={handleSubmit}
                >
                  {isSubscribing ? "S'inscrire" : "Se connecter"}
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
