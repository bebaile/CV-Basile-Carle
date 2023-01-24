import React, { useEffect, useState } from "react";
import api from "@services/services";
import DaysAvailability from "@components/DaysAvailability";
import UsersList from "@components/UsersList";
import "../styles/admin.css";

function Admin() {
  // récupère les préférences de disponibilités
  const [availabilities, setAvailabilities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailabilityModified, setIsAvailabilityModified] = useState();
  const [areUsersModified, setAreUsersModified] = useState();

  useEffect(() => {
    api.get("/availability").then((result) => {
      setAvailabilities(result.data);
    });
  }, [isAvailabilityModified]);

  useEffect(() => {
    setIsLoading(false);
  }, [availabilities]);

  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  return (
    <div className="container">
      <div className="admin">
        {isLoading ? (
          "Chargement ..."
        ) : (
          <div className="availability-pref">
            <h1>Disponibilité semaine type</h1>
            <div id="select-availability-box">
              {days.map((day) => {
                const availability = availabilities.filter(
                  (dispo) => dispo.day === day
                );
                return (
                  <div className="day-box" key={day}>
                    <div className="day-title">{day}</div>
                    <DaysAvailability
                      day={day}
                      key={day}
                      availability={availability}
                      setIsAvailabilityModified={setIsAvailabilityModified}
                      isAvailabilityModified={isAvailabilityModified}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="user-admin">
          <h1>Gestion des utilisateurs</h1>
          <div className="user-list">
            <UsersList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
