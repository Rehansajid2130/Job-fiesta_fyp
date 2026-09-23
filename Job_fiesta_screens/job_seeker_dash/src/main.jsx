import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import JobSeekerDashBoardPage from '../JobSeekerDashBoardPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <JobSeekerDashBoardPage />
    </BrowserRouter>
  </React.StrictMode>
); 