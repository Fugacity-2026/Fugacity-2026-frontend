import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FlaskIntro from './components/FlaskIntro';
import TeamsPage from './pages/TeamsPage';
import MolCursor from './components/MolCursor';
import AboutPage from './pages/AboutPage.jsx';

const Home = () => {
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
    <>
      {/* Custom molecular cursor — always visible */}
      <MolCursor />

      {/* Intro animation */}
      {!introComplete && <FlaskIntro onComplete={handleIntroComplete} />}

      {/* Main page */}
      <div style={mainPageStyle}>
        <TeamsPage />
      </div>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
