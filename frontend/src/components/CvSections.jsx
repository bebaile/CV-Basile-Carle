import React from "react";

function CvSections() {
  return (
    <div className="container">
      <div className="cv-sections">
        <div className="onglet">
          <div>Compétences</div>
          <div>Expériences professionelles</div>
          <div>Formations</div>
          <div>Extra-professionel</div>
        </div>
        <div className="section-content-container">
          <div className="competences">
            <article>
              <div className="sub-section-title">Développement Web</div>
              <div className="sub-section-content">
                Maquettage, développement composants frontend
                (HTML/CSS/JavaScript + React) et backend (Node/Express/MySQL) +
                intégration & développement d’API REST + bases C
              </div>
            </article>
            <article>
              <div className="sub-section-title">Conseil & Recherche</div>
              <div className="sub-section-content">
                Gestion de projet, réalisation d’études et prévisions de marché,
                modélisation, conduite d’entretien, recherche avancée,
                sensibilité à l’expérience utilisateur, esprit rigoureux,
                créatif et collaboratif
              </div>
            </article>
            <article>
              <div className="sub-section-title">Anglais</div>
              <div className="sub-section-content">
                Courant, lu, écrit, parlé, TOEIC : 860/990 et pratique
                quotidienne en milieu professionnel (conférences, tables rondes,
                interviews, recherche documentaire ...)
              </div>
            </article>
            <article>
              <div className="sub-section-title">Allemand</div>
              <div className="sub-section-content">
                Lu, écrit, parlé (séjour linguistique à Hanovre)
              </div>
            </article>
            <article>
              <div className="sub-section-title">Informatique</div>
              <div className="sub-section-content">
                Word, Excel, PowerPoint, Access, Photoshop, GIMP, Lightroom
                (développement photo), Mac, PC et Unix/Linux, compétences
                réseaux, domotique
              </div>
            </article>
          </div>
          <div className="experiences-professionnelles">xxxxx</div>
          <div className="formations">xxxxx</div>
          <div className="Extra-professionel">xxxxx</div>
        </div>
      </div>
    </div>
  );
}

export default CvSections;
