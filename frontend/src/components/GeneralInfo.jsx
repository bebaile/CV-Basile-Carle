import React, { useContext } from "react";
import api from "@services/services";
import login from "@assets/login.png";
import logout from "@assets/logout.png";
import admin from "@assets/admin.png";
import appointments from "@assets/appointment.png";
import basile from "@assets/basileCarle.png";
import github from "@assets/github.png";
import linkedin from "@assets/linkedin.png";
import qrcode from "@assets/qrcode.png";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/Context";

function GeneralInfo({ isApointmentDisplayed, setIsApointmentDisplayed }) {
  const {
    isSubNavBarVisible,
    setIsSubNavBarVisible,
    isConnected,
    setIsConnected,
    infoUser,
  } = useContext(Context);

  const displayApointment = () => {
    setIsApointmentDisplayed(!isApointmentDisplayed);
  };

  const navigate = useNavigate();

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

  return (
    <div className="container">
      <div className="general-info">
        <div className="photo">
          <img src={basile} alt="Basile Carle" id="basile" />
        </div>
        <div className="social-networks">
          <a href="https://github.com/bebaile">
            <img src={github} alt="github" />
          </a>
          <a href="http://www.linkedin.com/in/basilecarle">
            <img src={linkedin} alt="linkedin" />
          </a>
        </div>
        <div className="contacts">
          <p>26 rue Baudin</p>
          <p>34000 Montpellier</p>
          <p>
            Tel : <a href="tel:33628161321">+33 6 28 16 13 21</a>
          </p>
          <p>
            Courriel :{" "}
            <a href="mailto:basile.carle@edhec.com">basile.carle@edhec.com</a>
          </p>

          <p>
            <button
              type="button"
              className="validation-btn"
              id="download-vcard-btn"
            >
              <a href="http://bebaile.free.fr/cvbc/BasileCarle.vcf">
                Télécharger ma carte de contacts
              </a>
            </button>
          </p>
        </div>
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
                  Se connecter
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
            onClick={() => {
              setIsSubNavBarVisible(false);
            }}
            onKeyDown={null}
            tabIndex="0"
          >
            <div>x</div>
          </div>
        </div>
      </div>
      <div className="qrcode">
        <div id="tiroir-qrcode">{"> "}Flasher mon CV</div>
        <img
          src={qrcode}
          alt="QR code pour consulter le CV sur un mobile"
          id="qrcode-img"
        />
      </div>
    </div>
  );
}

export default GeneralInfo;
