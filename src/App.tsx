import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlaskIntro from './components/FlaskIntro';
import TeamsPage from './pages/TeamsPage';
import MolCursor from './components/MolCursor';
import SponsorsPage from "./pages/SponsorsPage";
import EventsPage from './pages/EventsPage'; 
import FeedbackPage from './pages/FeedbackPage';
import AboutPage from './pages/AboutPage';

const App = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    setTimeout(() => setFadeIn(true), 60);
  };

  const mainPageStyle: React.CSSProperties = {
    opacity: fadeIn ? 1 : 0,
    transition: 'opacity 1s ease',
    visibility: introComplete ? 'visible' : 'hidden',
    position: introComplete ? 'relative' : 'absolute',
    width: '100%',
  };

  return (
    <BrowserRouter>
      {/* Custom molecular cursor — always visible */}
      <MolCursor />
       {!introComplete && (
        <FlaskIntro onComplete={handleIntroComplete} />
      )}

      {/* Intro animation or main application wrapper */}
      <div className="app-container" style={mainPageStyle}>
        <Routes>
          {/* Default page when entering the website is now HomePage */}
          <Route path="/" element={<HomePage />} />

          {/* Standalone webpage routes */}
          <Route path="/teams" element={<TeamsPage />} />

          <Route path='/feedback' element={<FeedbackPage />} />
          
          <Route path="/sponsors" element={<SponsorsPage />} />
           <Route path="/events" element={<EventsPage />} />
           <Route path="/about" element={<AboutPage />} />

          {/* Catch-all route: redirects any broken links back to the HomePage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;