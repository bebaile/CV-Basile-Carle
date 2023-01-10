import React from "react";
import Navbar from "@components/Navbar";
import GeneralInfo from "@components/GeneralInfo";
import GithubSummary from "@components/GithubSummary";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <GeneralInfo />
      <GithubSummary />
    </div>
  );
}

export default App;
