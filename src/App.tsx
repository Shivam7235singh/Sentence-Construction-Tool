import { BrowserRouter as Router, Route, Routes } from "react-router";
import HomePage from "./pages/Home";
import MainPage from "./pages/main";
import SentencePage from "./components/SentencePage";
import Result from "./pages/Result";
import { QuizProvider } from "./context/score";

const App = () => {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/sentence" element={<SentencePage />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
};

export default App;
