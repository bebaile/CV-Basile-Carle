import React from "react";
import Navbar from "@components/Navbar";
import GeneralInfo from "@components/GeneralInfo";
import GithubSummary from "@components/GithubSummary";
import ProfessionalObjectives from "@components/ProfessionalObjectives";
import CvSections from "@components/CvSections";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <GeneralInfo />
      <GithubSummary />
      <ProfessionalObjectives />
      <CvSections />
    </div>
  );
}

export default App;
