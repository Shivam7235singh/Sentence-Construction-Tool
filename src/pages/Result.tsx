import { useLocation, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/score";
import { useState } from "react";

const ResultPage = () => {
  const location = useLocation();
  const { score, responses } = useQuiz();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-200 p-6">
      {/* Result Score Circle */}
      <div className="bg-white rounded-2xl w-48 h-36 flex items-center justify-center text-3xl font-bold text-green-600 shadow-lg">
        {score} / {10}
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-green-500 text-white px-6 py-2 m-6 rounded-xl hover:bg-green-600"
      >
        Go to Dashboard
      </button>
      {responses.map((res, originalIdx) => {
        if (originalIdx === 0) return null; // skip index 0

        return (
          <div
            key={originalIdx}
            className="mb-4 shadow-md w-[70rem] h-64 p-4 rounded-xl bg-white relative flex flex-col gap-4"
          >
            <div className="flex flex-row gap-4">
            <p className="font-semibold">
              Q{originalIdx}: 
            </p>
            <p className="font-bold">
            {res.originalQuestion}
            </p>
            </div>
            <p className="flex flex-row gap-4">
              <span className="font-medium">Your Answer:</span> {res.userFilled}
            </p>
            <p className="flex flex-row ">
              <span className="font-medium">Correct Answer:</span>{" "}
              {res.correctFilled}
            </p>
            <p
              className={
                res.isCorrect
                  ? "text-green-600 font-bold text-lg absolute bottom-5 right-5"
                  : "text-red-600 font-bold text-lg absolute bottom-5 right-5"
              }
            >
              {res.isCorrect ? "Correct ✅" : "Incorrect ❌"}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ResultPage;
