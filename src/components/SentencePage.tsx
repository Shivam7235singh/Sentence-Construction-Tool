import { useState } from "react";
import SentenceCard from "./SentenceCard";
import questionsData from "../questionsData.json";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/score"; // Make sure this exists and is imported

const MainPage = () => {
  const { score, setScore, responses, setResponses } = useQuiz();
  const questions = questionsData.data.questions;
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  const handleNext = (selectedAnswer: string[]) => {
    const currentQuestion = questions[currentIndex];
  
    const isCorrect = selectedAnswer.every(
      (word: string, i: number) => word === currentQuestion.correctAnswer[i]
    );
  
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  
    // Build question with user's answer
    let userFilled = "";
    let correctFilled = "";
    const sentenceParts = currentQuestion.question.split("_____________");
  
    sentenceParts.forEach((part, i) => {
      userFilled += part;
      correctFilled += part;
      if (i < selectedAnswer.length) {
        userFilled += selectedAnswer[i];
        correctFilled += currentQuestion.correctAnswer[i];
      }
    });
  
    const response = {
      originalQuestion: currentQuestion.question,
      userFilled,
      correctFilled,
      selected: selectedAnswer,
      correct: currentQuestion.correctAnswer,
      isCorrect,
    };
  
    setResponses((prev) => [...prev, response]);
  
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert("All questions completed successfully!");
      navigate("/result");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f8fc] p-6 shadow-lg-rounded-3xl">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <SentenceCard
          question={questions[currentIndex]}
          onAnswer={handleNext}
        />
      </div>
    </div>
  );
};

export default MainPage;
