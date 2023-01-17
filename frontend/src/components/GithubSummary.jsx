import React, { useEffect, useState } from "react";
import axios from "axios";

function GithubSummary() {
  const ENDPOINT = "https://api.github.com/users/bebaile";
  const [githubProfile, setGithubProfile] = useState([]);
  const [fullDate, setFullDate] = useState("");
  useEffect(() => {
    axios.get(ENDPOINT).then((response) => {
      setGithubProfile(response.data);
    });
  }, []);

  useEffect(() => {
    const date = new Date(githubProfile.created_at);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();
    setFullDate(`${day}/${month}/${year}`);
  }, [githubProfile]);

  return (
    <div className="container">
      <div className="github-summary">
        <div>
          <h2>Création du profil Github Github :</h2> {fullDate}
        </div>
        <div>
          <h2>Nombre de Repo :</h2> {githubProfile.public_repos}
        </div>
      </div>
    </div>
  );
}

export default GithubSummary;
