import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@components/Navbar";
import MyCV from "@pages/MyCV";
import Login from "@pages/Login";
import Admin from "@pages/Admin";
import PrivateRoute from "@services/PrivateRoute";

import "./App.css";

function App() {
  const [isApointmentDisplayed, setIsApointmentDisplayed] = useState(false);
  const [isUserAccountDisplayed, setIsUserAccountDisplayed] = useState(false);
  return (
    <Router>
      <div className="App">
        <Navbar
          isApointmentDisplayed={isApointmentDisplayed}
          setIsApointmentDisplayed={setIsApointmentDisplayed}
          setIsUserAccountDisplayed={setIsUserAccountDisplayed}
          isUserAccountDisplayed={isUserAccountDisplayed}
        />
        <Routes>
          <Route
            path="/"
            element={
              <MyCV
                isApointmentDisplayed={isApointmentDisplayed}
                setIsApointmentDisplayed={setIsApointmentDisplayed}
                isUserAccountDisplayed={isUserAccountDisplayed}
                setIsUserAccountDisplayed={setIsUserAccountDisplayed}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
