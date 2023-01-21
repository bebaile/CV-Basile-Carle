import React from "react";
import AvailabilitySlot from "./AvailabilitySlot";

function DaysAvailability(day) {
  return (
    <div className="day-box">
      <AvailabilitySlot day={day} />
    </div>
  );
}

export default DaysAvailability;
