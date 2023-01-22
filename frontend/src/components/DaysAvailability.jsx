import React from "react";
import AvailabilitySlot from "./AvailabilitySlot";

function DaysAvailability({ day, availability }) {
  console.error(availability);
  console.error(day);

  return (
    <div className="day-box">
      <div className="dispo-by-day">
        {availability.map((dispo) => {
          return (
            <div>
              De {dispo.start} à {dispo.end}
            </div>
          );
        })}
      </div>
      <AvailabilitySlot day={day} />
    </div>
  );
}

export default DaysAvailability;
