import React, { useState } from "react";
import GeneralInfo from "@components/GeneralInfo";
import GithubSummary from "@components/GithubSummary";
import ProfessionalObjectives from "@components/ProfessionalObjectives";
import CvSections from "@components/CvSections";
import Apointments from "@components/Apointments";

function MyCV() {
  const [isApointmentDisplayed, setIsApointmentDisplayed] = useState(false);
  return (
    <>
      <GeneralInfo
        isApointmentDisplayed={isApointmentDisplayed}
        setIsApointmentDisplayed={setIsApointmentDisplayed}
      />
      {isApointmentDisplayed ? <Apointments /> : null}
      <GithubSummary />
      <ProfessionalObjectives />
      <CvSections />
    </>
  );
}

export default MyCV;
