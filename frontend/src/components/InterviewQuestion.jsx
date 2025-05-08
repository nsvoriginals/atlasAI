export const QuestionCard = ({ question, answer, difficulty, type, skills, no }) => {
    // Normalize difficulty to handle different case variations
    const normalizedDifficulty = difficulty?.toLowerCase() || '';
    
    // Determine the color based on the difficulty
    const difficultyClass = normalizedDifficulty.includes('hard')
      ? "bg-red-500 text-white hover:bg-red-600"
      : normalizedDifficulty.includes('medium')
      ? "bg-orange-500 text-white hover:bg-orange-600"
      : "bg-green-500 text-white hover:bg-green-600";
  
    return (
      <div className="w-[90%] mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4 border border-gray-200 hover:shadow-xl transition-all duration-300">
        <p className="text-gray-500 font-medium">Question {no}</p>
        <h3 className="text-xl font-semibold text-gray-800">{question}</h3>
  
        <div className="text-gray-700">
          <strong className="text-gray-800">Expected Answer:</strong>
          <p className="mt-1 text-sm text-gray-600">{answer}</p>
        </div>
  
        <div className="flex flex-wrap gap-4 text-sm mt-4">
          <div className={`px-3 py-1 rounded-full font-medium transition-colors duration-200 ${difficultyClass}`}>
            Difficulty: {difficulty}
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium hover:bg-blue-200 transition-colors duration-200">
            Type: {type}
          </div>
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium hover:bg-yellow-200 transition-colors duration-200">
            Skills: {skills}
          </div>
        </div>
      </div>
    );
  };
  