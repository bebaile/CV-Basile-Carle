import React from "react";
import GeneralInfo from "@components/GeneralInfo";
// Pour le moment, section désactivée car n'apporte pas d'intérêt tel quel pour l'utilisateur
// import GithubSummary from "@components/GithubSummary";
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
      {/* pour le moment, la section GitHub est désactivée car elle ne présente pas d'intérêt pour l'utilisateur */}
      {/* <GithubSummary /> */}
      <ProfessionalObjectives />
      <CvSections />
    </>
  );
}

export default MyCV;
