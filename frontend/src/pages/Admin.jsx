import React from "react";
import "../styles/admin.css";

function Admin() {
  return (
    <div className="container">
      <div className="availability-pref">
        <h1>Disponibilité semaine type</h1>
        <div id="select-availability-box">
          <div className="day-box">
            <div className="day-title">Lundi</div>
            <div>
              <button type="button">Ajouter un créneau</button>
            </div>
          </div>
          <div className="day-box">
            <div className="day-title">Lundi</div>
          </div>
          <div className="day-box">
            <div className="day-title">Mardi</div>
          </div>
          <div className="day-box">
            <div className="day-title">Mercredi</div>
          </div>
          <div className="day-box">
            <div className="day-title">Jeudi</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
