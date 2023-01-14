import React, { useState } from "react";
import sections from "../data/section.json";

function CvSections() {
  const [isSelected, setIsSelected] = useState(1);

  const handleOnglet = (index) => {
    const slider = document.querySelector(".section-slider");
    switch (index) {
      case 1:
        slider.classList.remove("experiences-selected");
        slider.classList.remove("formations-selected");
        slider.classList.remove("extraprofessionel-selected");
        slider.classList.add("competences-selected");
        setIsSelected(1);
        break;
      case 2:
        slider.classList.remove("competences-selected");
        slider.classList.remove("formations-selected");
        slider.classList.remove("extraprofessionel-selected");
        slider.classList.add("experiences-selected");
        setIsSelected(2);
        break;
      case 3:
        slider.classList.remove("competences-selected");
        slider.classList.remove("experiences-selected");
        slider.classList.remove("extraprofessionel-selected");
        slider.classList.add("formations-selected");
        setIsSelected(3);
        break;
      case 4:
        slider.classList.remove("competences-selected");
        slider.classList.remove("experiences-selected");
        slider.classList.remove("formations-selected");
        slider.classList.add("extraprofessionel-selected");
        setIsSelected(4);
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
            className={
              isSelected === 1
                ? "competences-onglet onglet-selected sub-onglet"
                : "competences-onglet sub-onglet"
            }
            role="button"
            onClick={() => handleOnglet(1)}
            onKeyDown={() => handleOnglet(1)}
            tabIndex={0}
          >
            Compétences
          </div>

          <div
            className={
              isSelected === 2
                ? "experiences-onglet onglet-selected sub-onglet"
                : "experiences-onglet sub-onglet"
            }
            role="button"
            onClick={() => handleOnglet(2)}
            onKeyDown={() => handleOnglet(2)}
            tabIndex={0}
          >
            Expériences professionelles
          </div>
          <div
            className={
              isSelected === 3
                ? "formations-onglet onglet-selected sub-onglet"
                : "formations-onglet sub-onglet"
            }
            role="button"
            onClick={() => handleOnglet(3)}
            onKeyDown={() => handleOnglet(3)}
            tabIndex={0}
          >
            Formations
          </div>
          <div
            className={
              isSelected === 4
                ? "extraprofessionel-onglet onglet-selected sub-onglet"
                : "extraprofessionel-onglet sub-onglet"
            }
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
