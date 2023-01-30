import React from "react";
import GeneralInfo from "@components/GeneralInfo";
import GithubSummary from "@components/GithubSummary";
import ProfessionalObjectives from "@components/ProfessionalObjectives";
import CvSections from "@components/CvSections";
import Apointments from "@components/Apointments";

function MyCV() {
  return (
    <>
      <GeneralInfo />
      <Apointments />
      <GithubSummary />
      <ProfessionalObjectives />
      <CvSections />
    </>
  );
}

export default MyCV;
