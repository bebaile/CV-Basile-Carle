import React, { useEffect } from "react";
import api from "@services/services";
import AvailabilitySlot from "@components/AvailabilitySlot";
import "../styles/admin.css";

function Admin() {
  // récupère les préférences de disponibilités
  useEffect(() => {
    api.get("/availability").then((result) => {
      console.error(result);
    });
  }, []);

  const handleNewTimeslot = () => {};

  return (
    <div className="container">
      <div className="availability-pref">
        <h1>Disponibilité semaine type</h1>
        <div id="select-availability-box">
          <div className="day-box">
            <div className="day-title">Lundi</div>
            {/*  */}
            <AvailabilitySlot />
            {/*  */}
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
          <div className="day-box">
            <div className="day-title">Vendredi</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
