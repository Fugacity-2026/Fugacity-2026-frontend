import React, { useState } from 'react';
import FlaskIntro from './components/FlaskIntro';
import EventsPage from './components/EventsPage';
import MolCursor from './components/MolCursor';

const App = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    setTimeout(() => setFadeIn(true), 60);
  };

  return (
    <>
      {/* Custom molecular cursor — always visible */}
      <MolCursor />

      {/* Intro animation */}
      {!introComplete && <FlaskIntro onComplete={handleIntroComplete} />}

      {/* Main page */}
      <div style={{
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 1s ease',
        visibility: introComplete ? 'visible' : 'hidden',
        position: introComplete ? 'relative' : 'absolute',
      }}>
        <EventsPage />
      </div>
    </>
  );
};

export default App;
