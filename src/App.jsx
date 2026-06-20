import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AboutPage from './pages/AboutPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;