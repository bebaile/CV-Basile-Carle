import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@components/Navbar";
import MyCV from "@pages/MyCV";
import Login from "@pages/Login";
import Admin from "@pages/Admin";
import PrivateRoute from "@services/PrivateRoute";
import Context from "./context/Context";

import "./App.css";

function App() {
  const { infoUser } = useContext(Context);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<MyCV />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute infoUser={infoUser}>
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
