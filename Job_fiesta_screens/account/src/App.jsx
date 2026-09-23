import React from "react";
import { Routes, Route } from "react-router-dom";
import AccountsettingsPage from "./pages/AccountsettingsPage.jsx";

const App = () => (
  <Routes>
    <Route path="/" element={<AccountsettingsPage />} />
  </Routes>
);

export default App; 