// types.ts
export interface Response {
    originalQuestion: string,
    userFilled: string,
    correctFilled: string,
    selected: [],
    correct: [],
  }
  
  export interface QuizContextType {
    score: number;
    responses: Response[];
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setResponses: React.Dispatch<React.SetStateAction<Response[]>>;
  }
  