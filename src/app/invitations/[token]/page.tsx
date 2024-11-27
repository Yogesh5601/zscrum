"use client";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Accept the token as a part of the dynamic route params
const Invitation = ({ params }: { params: Promise<{ token: string }> }) => {
  // Unwrap the token using React.use() hook
  const { token } = use(params);

  console.log(token, "Token from params");

  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(token, "Token from params");

  // Function to fetch the invitation details using the token
  const fetchInvitation = async () => {
    try {
      console.log(token);
      const response = await axios.get("/api/invite/invitations", {
        params: { token },
      });
      console.log(response.data.result, "res");
      if (response.data.success) {
        setInvitation(response.data.result);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching invitation:", error);
      setError("Failed to load invitation.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle accepting or rejecting the invitation
  const respondToInvitation = async (status) => {
    try {
      const response = await axios.post("/api/invite/respond", {
        token,
        status,
      });
      if (response.data.success) {
        alert(`Invitation ${status}ed successfully!`);
        setInvitation({ ...invitation, status });
      } else {
        alert(`Failed to ${status} the invitation.`);
      }
    } catch (error) {
      console.error(`Error ${status}ing invitation:`, error);
      alert(`Error ${status}ing invitation.`);
    }
  };

  // Fetch the invitation details on component mount
  useEffect(() => {
    if (token) {
      fetchInvitation();
    }
  }, [token]);

  // Loading, error, and no invitation states
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">No invitation found.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Invitation from {invitation.landlordId.name}
        </h2>
        <p className="text-gray-700 mb-6">
          You have been invited by{" "}
          <span className="font-medium">{invitation.landlordId.name}</span>.
          Please respond to the invitation.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Status:{" "}
          <span
            className={`${
              invitation.status === "Pending"
                ? "text-yellow-500"
                : invitation.status === "Accepted"
                ? "text-green-500"
                : "text-red-500"
            } font-medium`}
          >
            {invitation.status}
          </span>
        </p>
        {invitation.status === "Pending" && (
          <div className="flex space-x-4">
            <button
              onClick={() => respondToInvitation("Accepted")}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
            >
              Accept
            </button>
            <button
              onClick={() => respondToInvitation("Rejected")}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invitation;
