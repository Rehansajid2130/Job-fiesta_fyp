import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import JobdetailsPage from "./src/pages/JobdetailsPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <JobdetailsPage />
    </BrowserRouter>
  </React.StrictMode>
); 