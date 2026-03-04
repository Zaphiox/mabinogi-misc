import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from '@web/component/Navbar';
import ErrorPage from '@web/pages/ErrorPage';
import Contact from '@web/pages/contact/Contact';
import Calculator from '@web/pages/calculator/Calculator';

const App: React.FC = () => {
  return (
    <div className="app-layout">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/calculator" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calculator" element={<Calculator />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
