import React from "react";
import sections from "../data/section.json";

function CvSections() {
  const handleOngletCompetences = () => {
    const onglet = document.querySelector(".competences");
    if (onglet.style.display === "none") {
      onglet.style.display = "initial";
    } else onglet.style.display = "none";
  };

  const handleOngletExperience = () => {
    const onglet = document.querySelector(".experiences-professionnelles");
    if (onglet.style.display === "none") {
      onglet.style.display = "initial";
    } else onglet.style.display = "none";
  };

  return (
    <div className="container">
      <div className="cv-sections">
        <div className="onglet">
          <div className="competences-onglet" onClick={handleOngletCompetences}>
            Compétences
          </div>
          <div className="experiences-onglet" onClick={handleOngletExperience}>
            Expériences professionelles
          </div>
          <div className="formations-onglet">Formations</div>
          <div className="extraprofessionel-onglet">
            Activités extra-professionelles
          </div>
        </div>
        <div className="section-content-container">
          {sections.map((section) => {
            return (
              <div
                className={section.name}
                dangerouslySetInnerHTML={{ __html: section.html }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CvSections;
