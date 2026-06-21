import React, { useState } from 'react';
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

export default App;
