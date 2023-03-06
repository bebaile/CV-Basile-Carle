/* eslint-disable no-nested-ternary */
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@services/services";
import basile from "@assets/basileCarle.png";
import Context from "../context/Context";
import "../styles/login.css";

function Login() {
  const { setIsConnected, setInfoUser } = useContext(Context);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [arePasswordEqual, setArePasswordEqual] = useState(true);
  const [alert, setAlert] = useState({
    type: "button",
    message: "> Je souhaite m'inscrire",
  });
  const [credentials, setCredentials] = useState({
    email: "",
    firstname: "",
    lastname: "",
    company: "",
    password: "",
    confirmedPassword: "",
  });

  const navigate = useNavigate();

  const handleClick = () => {
    setIsSubscribing(!isSubscribing);
    setArePasswordEqual(true);
  };

  useEffect(() => {
    switch (isSubscribing) {
      case true:
        setAlert({ type: "button", message: "> Je suis déjà inscrit" });
        break;
      case false:
        setAlert({ type: "button", message: "> Je souhaite m'inscrire" });
        break;
      default:
        break;
    }
  }, [isSubscribing]);

  const checkEmail = (e) => {
    api
      .get(`/users/check/${e.target.value}`)
      .then((result) => {
        setAlert({ type: "button", message: "> Je souhaite m'inscrire" });
        console.error(result.status);
      })
      .catch((error) => {
        console.error(error.response.status);
        if (error.response.status === 409) {
          setAlert({ type: "alert", message: "L'utilisateur existe déjà" });
          // e.target.value = "";
        }
        if (error.response.status === 404) {
          setAlert({ type: "button", message: "> Je souhaite m'inscrire" });
          console.error("Cet identifiant est disponible");
        }
      });
  };

  const checkFilledInputs = () => {
    const checkedValues = [];
    for (const key in credentials) {
      // sans cette condition, on va aussi parcourir les propriétés du prototype
      // eslint-disable-next-line no-prototype-builtins
      if (credentials.hasOwnProperty(key)) {
        if (credentials[key] === "") {
          checkedValues.push(key);
        }
      }
    }

    return checkedValues;
  };

  const handleSubmit = () => {
    // si l'utilisateur veut créer un compte
    if (isSubscribing === true) {
      // si tous les champs sont remplis, on peut procéder à la création de l'utilisateur
      if (checkFilledInputs().length === 0) {
        if (credentials.password !== credentials.confirmedPassword) {
          setArePasswordEqual(false);
          setAlert({ type: "alert", message: "Mots de passes différents" });
        } else {
          api
            .post("/users/create", {
              email: credentials.email,
              firstname: credentials.firstname,
              lastname: credentials.lastname,
              company: credentials.company,
              password: credentials.password,
            })
            .then((result) => {
              if (result.data === "Created") {
                setAlert({
                  type: "announce",
                  message: "Utilisateur créé avec succès",
                });
                setTimeout(() => {
                  setIsSubscribing(false);
                }, 3000);
              }
            })
            .catch((error) => {
              if (error.response.status === 409) {
                setAlert({
                  type: "alert",
                  message: "Utilisateur déjà existant",
                });
              }
              if (error.response.status === 422) {
                console.error(error.response.statusText);
              }
            });
        }
      }
      // mais si un des champs est manquant, il faut le signaler
      else {
        setAlert({
          type: "alert",
          message: `Remplissez bien tous les champs`,
        });
        console.error(checkFilledInputs());
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
              console.error("on est admin");
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
              <span
                className={
                  alert.type === "alert"
                    ? "alert"
                    : alert.type === "announce"
                    ? "announce"
                    : ""
                }
              >
                {alert.message}
              </span>
            </div>
            <form>
              <label htmlFor="courriel">
                <div>Courriel :</div>
                <div>
                  <input
                    type="text"
                    id="courriel"
                    name="courriel"
                    onChange={(e) => {
                      setIsSubscribing(true);
                      setCredentials({ ...credentials, email: e.target.value });
                    }}
                    onBlur={isSubscribing ? checkEmail : null}
                    className={
                      alert.message === "L'utilisateur existe déjà"
                        ? "incorrect"
                        : ""
                    }
                  />
                </div>
              </label>
              {isSubscribing ? (
                <div>
                  <label htmlFor="firstname">
                    <div>Prénom :</div>
                    <div>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        onChange={(e) => {
                          setIsSubscribing(true);
                          setCredentials({
                            ...credentials,
                            firstname: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </label>
                  <label htmlFor="lastname">
                    <div>Nom :</div>
                    <div>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        onChange={(e) => {
                          setIsSubscribing(true);
                          setCredentials({
                            ...credentials,
                            lastname: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </label>
                  <label htmlFor="entreprise">
                    <div>Entreprise :</div>
                    <div>
                      <input
                        type="text"
                        id="entreprise"
                        name="entreprise"
                        onChange={(e) => {
                          setIsSubscribing(true);
                          setCredentials({
                            ...credentials,
                            company: e.target.value,
                          });
                        }}
                      />
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
                    onChange={(e) => {
                      setIsSubscribing(true);
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      });
                    }}
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
                      onChange={(e) => {
                        setIsSubscribing(true);
                        setCredentials({
                          ...credentials,
                          confirmedPassword: e.target.value,
                        });
                      }}
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
