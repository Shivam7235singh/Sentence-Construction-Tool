import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/score";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string[]; // ✅ fixed this to match your context
}

interface SentenceCardProps {
  question: Question;
  onAnswer: (selectedAnswer: string[]) => void; // ✅ changed to string[]
}

const SentenceCard: React.FC<SentenceCardProps> = ({ question, onAnswer }) => {
  const [sentenceParts, setSentenceParts] = useState<string[]>([]);
  const [filledWords, setFilledWords] = useState<string[]>([]);
  const [availableOptions, setAvailableOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const { score, setScore, responses, setResponses } = useQuiz();

  const navigate = useNavigate();

  useEffect(() => {
    const parts = question.question.split("_____________");
    setSentenceParts(parts);
    setFilledWords(new Array(parts.length - 1).fill(""));
    setAvailableOptions(question.options);
    setTimeLeft(30);
  }, [question]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleSubmit(); // Auto-submit
          clearInterval(timer);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [filledWords]);

  const handleOptionClick = (word: string) => {
    const index = filledWords.findIndex((w) => w === "");
    if (index === -1) return;
    const updated = [...filledWords];
    updated[index] = word;
    setFilledWords(updated);
    setAvailableOptions((prev) => prev.filter((w) => w !== word));
  };

  const handleBlankClick = (index: number) => {
    if (filledWords[index]) {
      setAvailableOptions((prev) => [...prev, filledWords[index]]);
      const updated = [...filledWords];
      updated[index] = "";
      setFilledWords(updated);
    }
  };

  const handleSubmit = () => {
    // ✅ Pass the selected words as array, not joined string
    onAnswer(filledWords);
  };


  const handleExit= () => {
    setScore(0);
    setResponses([{
      originalQuestion: "",
      userFilled: "",
      correctFilled: "",
      selected: [],
      correct: [],
    }]);
    navigate("/");
  }


  return (
    <div className="bg-white rounded-2xl p-6 w-full h-[34rem] select-none relative max-w-3xl mx-auto my-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-green-500 font-semibold text-xl">
          Time: {timeLeft}s
        </div>
        <button
          onClick={handleExit}
          className="shadow-2xl bg-red-600 font-bold text-white px-6 py-2 rounded-xl"
        >
          Quit
        </button>
      </div>
      <h1 className="text-xl text-center font-medium m-5 text-gray-500">select the missing word in correct order</h1>

      <div className="text-xl font-medium mb-6 flex flex-wrap h-64 gap-2">
        {sentenceParts.map((part, i) => (
          <span key={i}>
            {part}
            {i < filledWords.length && (
              <button
                className={`px-3 py-1 mx-1 border rounded-lg ${
                  filledWords[i]
                    ? "bg-blue-100 hover:bg-blue-200"
                    : "bg-gray-100 text-gray-400"
                }`}
                onClick={() => handleBlankClick(i)}
              >
                {filledWords[i] || "_______"}
              </button>
            )}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {availableOptions.map((word, i) => (
          <button
            key={i}
            onClick={() => handleOptionClick(word)}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          >
            {word}
          </button>
        ))}
      </div>

      <div className="absolute -bottom-6 right-4">
        <button
          onClick={handleSubmit}
          disabled={filledWords.includes("")}
          className={`px-6 py-2 rounded-xl font-bold text-white ${
            filledWords.includes("")
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Save & Next
        </button>
      </div>
    </div>
  );
};

export default SentenceCard;
