import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@services/services";

function PrivateRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/auth/admin")
      .then((result) => {
        if (result.status !== 200) {
          console.error(result.data);
        }
        if (result.status === 200) {
          setIsAdmin(true);
        }
      })
      .catch((error) => {
        console.error(error.response.status);
        navigate("/");
      });
  }, []);

  useEffect(() => {
    if (isAdmin) {
      setIsLoading(true);
    }
  }, [isAdmin]);

  return <>{isLoading ? children : null};</>;
}

export default PrivateRoute;
