import React, { useState } from "react";

function Navbar() {
  // cache la barre de navigation quand l'utilisateur défile
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);
  document.addEventListener("scroll", () => {
    setIsNavBarVisible(false);
    setTimeout(() => {
      setIsNavBarVisible(true);
    }, 1000);
  });

  return (
    <div className="container">
      <div id={isNavBarVisible ? "opacity-navbar" : null} />
      <div className={isNavBarVisible ? "navbar" : "hidden-navbar"}>
        <strong className="title">
          <div>
            <h1>Basile CARLE</h1>
          </div>
          <div>Développeur junior Fullstack</div>
        </strong>
      </div>
      <div id="spacer" />
    </div>
  );
}

export default Navbar;
