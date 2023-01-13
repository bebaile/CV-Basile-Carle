import React from "react";
import sections from "../data/section.json";

function CvSections() {
  const handleOnglet = (index) => {
    console.error(document.querySelector(".section-slider").classList.value);
    const slider = document.querySelector(".section-slider");
    switch (index) {
      case 1:
        slider.classList.remove("experiences-selected");
        slider.classList.remove("formations-selected");
        slider.classList.remove("extraprofessionel-selected");
        slider.classList.add("competences-selected");
        break;
      case 2:
        slider.classList.remove("competences-selected");
        slider.classList.remove("formations-selected");
        slider.classList.remove("extraprofessionel-selected");
        slider.classList.add("experiences-selected");
        break;
      case 3:
        slider.classList.remove("competences-selected");
        slider.classList.remove("experiences-selected");
        slider.classList.remove("extraprofessionel-selected");
        slider.classList.add("formations-selected");
        break;
      case 4:
        slider.classList.remove("competences-selected");
        slider.classList.remove("experiences-selected");
        slider.classList.remove("formations-selected");
        slider.classList.add("extraprofessionel-selected");
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <div className="cv-sections">
        <div className="onglet">
          <div
            className="competences-onglet"
            role="button"
            onClick={() => handleOnglet(1)}
            onKeyDown={() => handleOnglet(1)}
            tabIndex={0}
          >
            Compétences
          </div>
          <div
            className="experiences-onglet"
            role="button"
            onClick={() => handleOnglet(2)}
            onKeyDown={() => handleOnglet(2)}
            tabIndex={0}
          >
            Expériences professionelles
          </div>
          <div
            className="formations-onglet"
            role="button"
            onClick={() => handleOnglet(3)}
            onKeyDown={() => handleOnglet(3)}
            tabIndex={0}
          >
            Formations
          </div>
          <div
            className="extraprofessionel-onglet"
            role="button"
            onClick={() => handleOnglet(4)}
            onKeyDown={() => handleOnglet(4)}
            tabIndex={0}
          >
            Activités extra-professionelles
          </div>
        </div>
        <div className="section-content-container">
          <div className="section-slider">
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
    </div>
  );
}

export default CvSections;
