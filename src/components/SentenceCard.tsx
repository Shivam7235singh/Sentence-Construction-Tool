import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const SentenceCard = ({ question }) => {
  const [sentenceParts, setSentenceParts] = useState([]);
  const [filledWords, setFilledWords] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30); // Countdown time

    const navigate = useNavigate();

  useEffect(() => {
    const blanks = question.question.split("_____________");
    setSentenceParts(blanks);
    setFilledWords(new Array(blanks.length - 1).fill(""));
    setAvailableOptions(question.options);
    setTimeLeft(30); // Reset timer for each question
  }, [question]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOptionClick = (word) => {
    const index = filledWords.findIndex((w) => w === "");
    if (index === -1) return;
    const updated = [...filledWords];
    updated[index] = word;
    setFilledWords(updated);
    setAvailableOptions((prev) => prev.filter((w) => w !== word));
  };

  const handleBlankClick = (index) => {
    if (filledWords[index]) {
      setAvailableOptions((prev) => [...prev, filledWords[index]]);
      const updated = [...filledWords];
      updated[index] = "";
      setFilledWords(updated);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 w-full max-w-3xl mx-auto my-6">
      {/* Top bar */}
      <div className="flex justify-between mb-4">
        <div className="text-red-500 font-semibold text-lg">Time: {timeLeft}s</div>
        <button 
        onClick = {() =>navigate('/main')}
        className="text-gray-500 hover:text-red-500">Quit</button>
      </div>

      {/* Sentence with blanks */}
      <div className="text-xl font-medium mb-6 flex flex-wrap gap-2">
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

      {/* Option Buttons */}
      <div className="grid grid-cols-2 gap-4">
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

       
    </div>
  );
};

export default SentenceCard;
