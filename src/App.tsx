import React, { useState } from 'react';
import FlaskIntro from './components/FlaskIntro';
import TeamsPage from './pages/TeamsPage';
import MolCursor from './components/MolCursor';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SponsorsPage from "./pages/SponsorsPage";

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
};
  return (
  <BrowserRouter>
      {/* Custom molecular cursor — always visible */}
      <MolCursor />

      {/* Intro animation */}
      {!introComplete && <FlaskIntro onComplete={handleIntroComplete} />}

      {/* Main page */}
      <div style={mainPageStyle}>
  <Routes>
    <Route path="/" element={<TeamsPage />} />
    <Route path="/teams" element={<TeamsPage />} />
    <Route path="/sponsors" element={<SponsorsPage />} />
  </Routes>
</div>
        </BrowserRouter>
  );
};

export default App;
