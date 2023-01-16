import React, { useEffect, useState } from "react";
import axios from "axios";

function GithubSummary() {
  const ENDPOINT = "https://api.github.com/users/bebaile";
  const [githubProfile, setGithubProfile] = useState([]);
  useEffect(() => {
    axios.get(ENDPOINT).then((response) => {
      console.error(response.data);
      setGithubProfile(response.data);
    });
  }, []);

  return (
    <div className="container">
      <div className="github-summary">
        <div>
          Date de création du profil Github : {githubProfile.created_at}
        </div>
        <div>Nombre de Repo : {githubProfile.public_repos}</div>
      </div>
    </div>
  );
}

export default GithubSummary;
