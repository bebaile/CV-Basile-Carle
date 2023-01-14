import React from "react";

function ProfessionalObjectives() {
  return (
    <div className="container">
      <div className="professional-objectives">
        <details open="true">
          <summary>
            <h1>
              En recherche de contrat de professionnalisation d’un an à partir
              de mars 2023
            </h1>
          </summary>
          <p className="objectives">
            <strong>«</strong> Expert des technologies et innovations mobiles,
            je souhaite investir 14 ans d’expérience dans les télécoms et
            l’innovation technologique dans la réalisation de projets innovants
            au service d’un monde meilleur <strong>»</strong>
          </p>
          <button type="button" className="more-experience-btn">
            <strong>
              > En savoir plus sur mes 14 années de consultant Télécom mobile
            </strong>
          </button>
        </details>
      </div>
    </div>
  );
}

export default ProfessionalObjectives;
