import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostJobPage from "./pages/PostJobPage.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostJobPage />} />
      </Routes>
    </Router>
  );
};

export default App;
