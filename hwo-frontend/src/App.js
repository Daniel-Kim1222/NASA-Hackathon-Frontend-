// src/App.js
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
