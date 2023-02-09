import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "@services/services";
import basile from "@assets/basileCarle.png";
import Context from "../context/Context";
import "../styles/login.css";

function Login() {
  const { setIsConnected, setInfoUser } = useContext(Context);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [arePasswordEqual, setArePasswordEqual] = useState(true);

  const navigate = useNavigate();

  const handleClick = () => {
    setIsSubscribing(!isSubscribing);
    setArePasswordEqual(true);
  };

  const checkEmail = (email) => {
    api
      .get(`/user/${email}`)
      .then((result) => {
        console.error(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = () => {
    // si l'utilisateur veut créer un compte
    if (isSubscribing === true) {
      if (
        document.querySelector("#password").value !==
        document.querySelector("#confirmed-password").value
      ) {
        setArePasswordEqual(false);
        document.querySelector("#inscription").innerHTML =
          "<span style='color:red'>Mots de passes différents</span>";
      } else {
        api
          .post("/users/create", {
            email: document.querySelector("#courriel").value,
            firstname: document.querySelector("#firstname").value,
            lastname: document.querySelector("#lastname").value,
            company: document.querySelector("#entreprise").value,
            password: document.querySelector("#password").value,
          })
          .then((result) => {
            if (result.data === "Created") {
              document.querySelector("#inscription").innerHTML =
                "<span style='color:green'>Utilisateur créé avec succès</span>";
              setTimeout(() => {
                setIsSubscribing(false);
              }, 3000);
            } else {
              console.error(
                `L'utilisateur n'a pas pu être créé. Erreur ${result.status}`
              );
            }
          });
      }
    }
    // si l'utilisateur a déjà un compte et veut se connecter
    else {
      api
        .post("/auth", {
          email: document.querySelector("#courriel").value,
          password: document.querySelector("#password").value,
        })
        .then((result) => {
          if (result.status === 401 || result.status === 500) {
            console.error("erreur de connexion");
          } else {
            setIsConnected(true);
            setInfoUser({
              email: result.data.email,
              company: result.data.company,
              type: result.data.type,
            });
            sessionStorage.setItem("email", result.data.email);
            sessionStorage.setItem("firstname", result.data.firstname);
            sessionStorage.setItem("lastname", result.data.lastname);
            sessionStorage.setItem("company", result.data.company);
            sessionStorage.setItem("isConnected", true);
            if (result.data.type === "admin") {
              sessionStorage.setItem("type", result.data.type);
              navigate("/admin");
            } else {
              navigate("/");
            }
          }
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
              onKeyDown={null}
              tabIndex="0"
            >
              {isSubscribing
                ? "> Je suis déjà inscrit"
                : "> Je souhaite m'inscrire"}
            </div>
            <form>
              <label htmlFor="courriel">
                <div>Courriel :</div>
                <div>
                  <input
                    type="text"
                    id="courriel"
                    name="courriel"
                    onBlur={isSubscribing ? { checkEmail } : ""}
                  />
                </div>
              </label>
              {isSubscribing ? (
                <div>
                  <label htmlFor="firstname">
                    <div>Prénom :</div>
                    <div>
                      <input type="text" id="firstname" name="firstname" />
                    </div>
                  </label>
                  <label htmlFor="lastname">
                    <div>Nom :</div>
                    <div>
                      <input type="text" id="lastname" name="lastname" />
                    </div>
                  </label>
                  <label htmlFor="entreprise">
                    <div>Entreprise :</div>
                    <div>
                      <input type="text" id="entreprise" name="entreprise" />
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
