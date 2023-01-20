import React from "react";

function AvailabilitySlot() {
  return (
    <>
      <div className="timeslot">
        <label htmlFor="timeslot-start">
          De :
          <input type="time" id="timeslot-start" name="timeslot-start" />
        </label>
        <label htmlFor="timeslot-end">
          à :
          <input type="time" id="timeslot-end" name="timeslot-end" />
        </label>
      </div>
      <div>
        <button type="button" className="add-timeslot-btn">
          Ajouter un créneau
        </button>
      </div>
    </>
  );
}

export default AvailabilitySlot;
