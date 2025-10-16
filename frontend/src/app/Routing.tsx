import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ExhibitionsPage } from '@/pages/ExhibitionsPage';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';

const Routing: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/exhibitions" element={<ExhibitionsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default Routing;


