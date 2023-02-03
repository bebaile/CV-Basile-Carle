import React from "react";
import basile from "@assets/basileCarle.png";
import github from "@assets/github.png";
import linkedin from "@assets/linkedin.png";
import qrcode from "@assets/qrcode.png";

function GeneralInfo() {
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
