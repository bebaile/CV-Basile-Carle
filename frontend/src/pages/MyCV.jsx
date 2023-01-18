import React from "react";
import GeneralInfo from "@components/GeneralInfo";
import GithubSummary from "@components/GithubSummary";
import ProfessionalObjectives from "@components/ProfessionalObjectives";
import CvSections from "@components/CvSections";

function MyCV() {
  return (
    <>
      <GeneralInfo />
      <GithubSummary />
      <ProfessionalObjectives />
      <CvSections />
    </>
  );
}

export default MyCV;
