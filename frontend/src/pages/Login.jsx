import React, { useEffect } from "react";
import api from "@services/services";

function Login() {
  const ENDPOINT = "/users";
  useEffect(() => {
    api.get(`${ENDPOINT}`).then((result) => {
      console.error(result);
    });
  }, []);
  return <div>coucou</div>;
}

export default Login;
