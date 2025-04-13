// QuizContext.tsx
import React, { createContext, useContext, useState } from "react";
import { QuizContextType, Response } from "./types";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState<number>(0);
  const [responses, setResponses] = useState<Response[]>([{
    originalQuestion: "",
  userFilled: "",
  correctFilled: "",
  selected: [],
  correct: [],
  }]);

  return (
    <QuizContext.Provider value={{ score, setScore, responses, setResponses }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within a QuizProvider");
  return context;
};
