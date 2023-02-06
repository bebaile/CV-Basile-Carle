import React from "react";
import GeneralInfo from "@components/GeneralInfo";
import GithubSummary from "@components/GithubSummary";
import ProfessionalObjectives from "@components/ProfessionalObjectives";
import CvSections from "@components/CvSections";
import Apointments from "@components/Apointments";

function MyCV({ isApointmentDisplayed, setIsApointmentDisplayed }) {
  return (
    <>
      <GeneralInfo
        isApointmentDisplayed={isApointmentDisplayed}
        setIsApointmentDisplayed={setIsApointmentDisplayed}
      />
      {isApointmentDisplayed ? (
        <Apointments setIsApointmentDisplayed={setIsApointmentDisplayed} />
      ) : null}
      <GithubSummary />
      <ProfessionalObjectives />
      <CvSections />
    </>
  );
}

export default MyCV;
