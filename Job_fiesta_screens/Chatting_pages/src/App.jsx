import React from "react";
import { Routes, Route } from "react-router-dom";
import ChatMainPage from "./pages/ChatMainPage.jsx";

const App = () => (
  <Routes>
    <Route path="/" element={<ChatMainPage />} />
  </Routes>
);

export default App; 