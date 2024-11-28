"use client";
import { useState } from "react";
import UserDetails from "../UserDetails";
import RatingForm from "../RatingForm";
import ReviewSubmit from "../ReviewSubmit";
import LocationDetails from "../LocationDetails";

const ReviewForm = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    propertyName: "",
  });
  const [locationDetails, setLocationDetails] = useState({
    city: "",
    state: "",
    zip: "",
  });
  const [ratings, setRatings] = useState({
    repairRating: 3,
    healthAndSafety: 3,
    communication: 3,
  });
  const [comment, setComment] = useState("");

  // Navigate to next tab if current one is filled correctly
  const nextTab = () => {
    if (currentTab === 0 && userDetails.name && userDetails.address) {
      setCurrentTab(1);
    } else if (
      currentTab === 1 &&
      locationDetails.city &&
      locationDetails.state
    ) {
      setCurrentTab(2);
    } else if (
      currentTab === 2 &&
      ratings.repairRating &&
      ratings.healthAndSafety
    ) {
      setCurrentTab(3);
    }
  };

  const prevTab = () => setCurrentTab((prev) => Math.max(prev - 1, 0));

  const handleUserDetailsChange = (newDetails) => setUserDetails(newDetails);
  const handleLocationDetailsChange = (newDetails) =>
    setLocationDetails(newDetails);
  const handleRatingsChange = (newRatings) => setRatings(newRatings);
  const handleCommentChange = (newComment) => setComment(newComment);

  const handleSubmit = () => {
    const reviewData = { userDetails, locationDetails, ratings, comment };
    console.log("Review Submitted:", reviewData);
    alert("Review Submitted!");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-center mb-4">
        Rate Your Experience
      </h1>

      {/* Tab Navigation */}
      <div className="flex justify-between mb-6">
        <button
          onClick={prevTab}
          disabled={currentTab === 0}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>Step {currentTab + 1} of 4</span>
        <button
          onClick={nextTab}
          disabled={currentTab === 3}
          className={`bg-gray-500 text-white px-4 py-2 rounded ${
            (currentTab === 0 && (!userDetails.name || !userDetails.address)) ||
            (currentTab === 1 &&
              (!locationDetails.city || !locationDetails.state)) ||
            (currentTab === 2 &&
              (!ratings.repairRating || !ratings.healthAndSafety))
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
        >
          Next
        </button>
      </div>

      {/* Render the current step based on the tab */}
      {currentTab === 0 && (
        <UserDetails
          userDetails={userDetails}
          onChange={handleUserDetailsChange}
        />
      )}

      {currentTab === 1 && (
        <LocationDetails
          locationDetails={locationDetails}
          onChange={handleLocationDetailsChange}
        />
      )}

      {currentTab === 2 && (
        <RatingForm ratings={ratings} onChange={handleRatingsChange} />
      )}

      {currentTab === 3 && (
        <ReviewSubmit
          userDetails={userDetails}
          locationDetails={locationDetails}
          ratings={ratings}
          comment={comment}
          onCommentChange={handleCommentChange}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ReviewForm;
