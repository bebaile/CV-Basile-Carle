import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@components/Navbar";
import MyCV from "@pages/MyCV";
import Login from "@pages/Login";
import { ContextProvider } from "./context/Context";
import "./App.css";

function App() {
  return (
    <ContextProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<MyCV />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </ContextProvider>
  );
}

export default App;
