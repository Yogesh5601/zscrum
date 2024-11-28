import React from "react";

const ReviewSubmit = ({
  userDetails,
  locationDetails,
  ratings,
  comment,
  onCommentChange,
  onSubmit,
}) => {
  return (
    <div className="p-6 max-w-4xl mx-auto border rounded shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Help Us Create a Better Living Experience!
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Thank you for reviewing your landlord! Your feedback on maintenance,
        communication, and overall satisfaction will help tenants in your area
        make informed housing decisions.
      </p>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Landlord</h3>
        <div className="flex justify-between items-center border-b pb-2">
          <p>{userDetails.name}</p>
          <button className="text-blue-500 underline">Edit</button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Location</h3>
        <div className="flex justify-between items-center border-b pb-2">
          <p>
            {locationDetails.city}, {locationDetails.state},
            {locationDetails.zip} - ${locationDetails.priceRange}
          </p>
          <button className="text-blue-500 underline">Edit</button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-4">Ratings</h3>
        {Object.keys(ratings).map((category) => (
          <div
            key={category}
            className="flex justify-between items-center border-b pb-2 mb-2"
          >
            <div className="flex items-center gap-2">
              <span className="capitalize">
                {category.replace(/([A-Z])/g, " $1")}
              </span>
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`h-5 w-5 inline-block rounded-full ${
                      i < ratings[category] ? "bg-yellow-400" : "bg-gray-200"
                    }`}
                  ></span>
                ))}
              </div>
            </div>
            <button className="text-blue-500 underline">Edit</button>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Written Review</h3>
        <p className="text-sm text-gray-500 mb-4">
          Please follow our moderation policy:
          <br />
          1. Keep reviews civil and avoid including personal information such as
          addresses or phone numbers.
          <br />
          2. Avoid sharing personal details about yourself or your landlord that
          are not relevant to your rental experience.
          <br />
          3. Inappropriate content may be removed. Thank you for maintaining a
          safe and helpful community!
        </p>
        <textarea
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          rows={4}
          placeholder="Write your review here..."
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={onSubmit}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewSubmit;
