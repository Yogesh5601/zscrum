const RatingForm = ({ ratings, onChange }) => {
  const handleRatingChange = (category, value) => {
    onChange({ ...ratings, [category]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Rate on Different Categories</h2>
      <div className="mb-4">
        <label className="block">Repair Rating:</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className={`w-8 h-8 rounded-full border ${
                ratings.repairRating === num
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleRatingChange("repairRating", num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block">Health & Safety Rating:</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className={`w-8 h-8 rounded-full border ${
                ratings.healthAndSafety === num
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleRatingChange("healthAndSafety", num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block">Communication Rating:</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className={`w-8 h-8 rounded-full border ${
                ratings.communication === num
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleRatingChange("communication", num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingForm;
