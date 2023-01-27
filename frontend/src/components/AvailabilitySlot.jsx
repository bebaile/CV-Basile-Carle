import React, { useState } from "react";
import api from "@services/services";

function AvailabilitySlot({
  day,
  setIsAvailabilityModified,
  isAvailabilityModified,
}) {
  const [timeslotStart, setTimeslotStart] = useState();
  const [timeslotEnd, setTimeslotEnd] = useState();

  const handleChange = (e) => {
    if (e.target.name === "timeslot-start") {
      setTimeslotStart(e.target.value);
    } else {
      setTimeslotEnd(e.target.value);
    }
  };

  const handleAddTimeslot = () => {
    const availability = {
      day,
      start: timeslotStart,
      end: timeslotEnd,
    };

    api.post("/availability", availability).then((result) => {
      if (result.status === 201) {
        console.error("disponibilité ajouté avec succès");
        setIsAvailabilityModified(!isAvailabilityModified);
      } else {
        console.error("Erreur lors de la création de la disponibilité");
      }
    });
  };
  return (
    <>
      <div className="timeslot">
        <label htmlFor="timeslot-start">
          De :
          <input
            type="time"
            id="timeslot-start"
            name="timeslot-start"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="timeslot-end">
          à :
          <input
            type="time"
            id="timeslot-end"
            name="timeslot-end"
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          className="add-timeslot-btn"
          onClick={handleAddTimeslot}
        >
          Ajouter un créneau
        </button>
      </div>
    </>
  );
}

export default AvailabilitySlot;
