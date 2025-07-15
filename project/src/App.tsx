import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import ChatbotPage from './pages/ChatbotPage';
import PhotoUploadPage from './pages/PhotoUploadPage';
import CropPlanningPage from './pages/CropPlanningPage';
import BudgetPlannerPage from './pages/BudgetPlannerPage';
import MarketPricesPage from './pages/MarketPricesPage';
import WeatherPage from './pages/WeatherPage';
import GovernmentSchemesPage from './pages/GovernmentSchemesPage';
import FertilizerGuidePage from './pages/FertilizerGuidePage';
import CommunityForumPage from './pages/CommunityForumPage';
import EducationPage from './pages/EducationPage';
import MarketplacePage from './pages/MarketplacePage';
import IrrigationPage from './pages/IrrigationPage';
import LegalSupportPage from './pages/LegalSupportPage';
import AlertsPage from './pages/AlertsPage';
import CropTrackerPage from './pages/CropTrackerPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/photo-upload" element={<PhotoUploadPage />} />
              <Route path="/crop-planning" element={<CropPlanningPage />} />
              <Route path="/budget-planner" element={<BudgetPlannerPage />} />
              <Route path="/market-prices" element={<MarketPricesPage />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/government-schemes" element={<GovernmentSchemesPage />} />
              <Route path="/fertilizer-guide" element={<FertilizerGuidePage />} />
              <Route path="/community" element={<CommunityForumPage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/irrigation" element={<IrrigationPage />} />
              <Route path="/legal-support" element={<LegalSupportPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/crop-tracker" element={<CropTrackerPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;