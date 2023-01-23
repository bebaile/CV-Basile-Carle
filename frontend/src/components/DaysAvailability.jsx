import React from "react";
import api from "@services/services";
import AvailabilitySlot from "./AvailabilitySlot";

function DaysAvailability({
  day,
  availability,
  setIsAvailabilityModified,
  isAvailabilityModified,
}) {
  const handleDelete = (e) => {
    console.error(e.target.name);
    api.delete(`/availability/${e.target.name}`).then((result) => {
      if (result.status === 404) {
        console.error("la disponibilité n'a pas pu être détruite");
      } else {
        setIsAvailabilityModified(!isAvailabilityModified);
      }
    });
  };

  return (
    <div className="day-box">
      <div className="dispo-by-day">
        {availability.map((dispo) => {
          return (
            <div key={dispo.idavailability}>
              De {dispo.start} à {dispo.end}
              <button
                id="delete-availability"
                type="button"
                name={dispo.idavailability}
                onClick={handleDelete}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <AvailabilitySlot
        day={day}
        isAvailabilityModified={isAvailabilityModified}
        setIsAvailabilityModified={setIsAvailabilityModified}
      />
    </div>
  );
}

export default DaysAvailability;
