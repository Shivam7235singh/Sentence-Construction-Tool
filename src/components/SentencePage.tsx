import { useState } from "react";
import SentenceCard from "./SentenceCard"; // your component
import questionsData from "../questionsData.json"; // your JSON

const MainPage = () => {
  const questions = questionsData.data.questions;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("All questions completed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8fc] p-6">
      <SentenceCard question={questions[currentIndex]} />
      <div className="mt-6 text-center">
        <button
          onClick={handleNext}
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-xl"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
};

export default MainPage;
