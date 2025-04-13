import { useLocation, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/score";
import { useState } from "react";

const ResultPage = () => {
  const location = useLocation();
  const { score, responses } = useQuiz();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f8fc] p-6">
      {/* Result Score Circle */}
      <div className="bg-white rounded-full w-48 h-48 flex items-center justify-center text-3xl font-bold text-green-600 shadow-lg">
        {score} / {10}
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"
      >
        Play Again
      </button>
      {responses.map((res, idx) => (
        <div key={idx} className="mb-4 p-4 border rounded-xl">
          <p className="font-semibold">
            Q{idx + 1}: {res.originalQuestion}
          </p>
          <p>
            <span className="font-medium">Your Answer:</span> {res.userFilled}
          </p>
          <p>
            <span className="font-medium">Correct Answer:</span>{" "}
            {res.correctFilled}
          </p>
          <p className={res.isCorrect ? "text-green-600" : "text-red-600"}>
            {res.isCorrect ? "Correct ✅" : "Incorrect ❌"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ResultPage;
