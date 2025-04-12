import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-green-200 text-center">
      <h1 className="text-5xl font-bold text-green-700 mb-8">Welcome!</h1>
      <button
        onClick={() => navigate('/main')}
        className="bg-green-600 hover:bg-green-700 text-white text-xl px-6 py-3 rounded-full shadow-lg transition"
      >
        Sentence Construction
      </button>
    </div>
  );
};

export default HomePage;
