import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlaskIntro from './components/FlaskIntro';
import TeamsPage from './pages/TeamsPage';
import MolCursor from './components/MolCursor';

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
    <Router>
      {/* Custom molecular cursor — always visible */}
      <MolCursor />

      {/* Intro animation */}
      {!introComplete && <FlaskIntro onComplete={handleIntroComplete} />}

      {/* Main page handling routes */}
      <div style={mainPageStyle}>
        <Routes>
          {/* Default page when entering the website is now HomePage */}
          <Route path="/" element={<HomePage />} />

          {/* Separate standalone webpage route for Teams */}
          <Route path="/teams" element={<TeamsPage />} />

          {/* Catch-all route: redirects any broken links back to the HomePage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;