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

  // Calculate the progress as a percentage
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-green-200 p-6 shadow-lg-rounded-3xl">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full mb-4">
          <div
            className="bg-blue-500 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${progress}%` }}
          >
            {Math.round(progress)}%
          </div>
        </div>

        <SentenceCard
          question={questions[currentIndex]}
          onAnswer={handleNext}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
        />
      </div>
    </div>
  );
};

export default MainPage;
