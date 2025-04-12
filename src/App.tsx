import { BrowserRouter as Router, Route, Routes } from 'react-router';
import HomePage from './pages/Home';
import MainPage from './pages/main';
import SentencePage from './components/SentencePage';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/sentence" element={<SentencePage />} />
    </Routes>
    </Router>
  );
};

export default App;
