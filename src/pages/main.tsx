import { useNavigate } from "react-router";
import { FaCoins } from "react-icons/fa";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 font-sans">
      {/* Header */}
      <header className="bg-green-600 p-6 shadow-md rounded-b-3xl text-white text-center">
        <h1 className="text-4xl font-bold tracking-wide">
          Sentence Construction
        </h1>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-16">
        <img
          src="/Icons.png"
          alt="Sentence Construction"
          className="w-24 h-24 mb-6"
        />
        <h2 className="text-3xl font-semibold text-green-700 mb-4">
          Welcome to the Challenge!
        </h2>
        <p className="text-gray-700 text-lg max-w-xl">
          Select the correct words to complete the sentence by arranging the
          provided options in the right order.
        </p>
      </section>

      {/* Info Cards */}
      <section className="flex flex-wrap justify-center gap-8 px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-60 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Time Per Question
          </h3>
          <p className="text-2xl text-green-600 font-bold">30 sec</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 w-60 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Total Questions
          </h3>
          <p className="text-2xl text-green-600 font-bold">10</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 w-60 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Coins</h3>
          <div className="flex justify-center items-center gap-1 text-2xl font-bold text-green-600">
            10
            <FaCoins className="text-yellow-500 text-2xl" />
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="flex justify-center gap-8 pb-16">
        <button
          className="px-6 py-3 bg-gray-400 hover:bg-gray-600 text-white font-bold rounded-full shadow-md transition"
          onClick={() => navigate("/")}
        >
          Back
        </button>
        <button
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-md transition"
          onClick={() => navigate("/sentence")}
        >
          Start
        </button>
      </section>
    </div>
  );
};

export default MainPage;
