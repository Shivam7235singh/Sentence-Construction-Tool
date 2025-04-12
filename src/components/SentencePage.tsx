import { useState , useEffect} from "react";
import SentenceCard from "./SentenceCard"; // your component
import questionsData from "../questionsData.json"; // your JSON

const MainPage = () => {
  const questions = questionsData.data.questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Countdown time

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }, []);



  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("All questions completed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f8fc] p-6 shadow-lg-rounded-3xl">
    
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <SentenceCard question={questions[currentIndex]} />
  
      <div className="flex  justify-end  mt-auto">
      <button
        onClick={handleNext}
        className="mt-4  bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-xl "
      >
        Save & Next
      </button>
      </div>
    </div>
  </div>
  
  );
};

export default MainPage;
