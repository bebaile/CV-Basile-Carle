import React, { useEffect } from "react";
import api from "@services/services";
import DaysAvailability from "@components/DaysAvailability";
import "../styles/admin.css";

function Admin() {
  // récupère les préférences de disponibilités
  useEffect(() => {
    api.get("/availability").then((result) => {
      console.error(result);
    });
  }, []);

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  return (
    <div className="container">
      <div className="availability-pref">
        <h1>Disponibilité semaine type</h1>
        <div id="select-availability-box">
          {days.map((day) => {
            return (
              <div className="day-box" key={day}>
                <div className="day-title">{day}</div>
                <DaysAvailability day={day} key={day} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Admin;
