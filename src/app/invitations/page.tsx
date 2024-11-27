"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const InvitationsPage = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInvitations = async () => {
    try {
      const response = await axios.get("/api/invite/invitations");
      if (response.data.success) {
        setInvitations(response.data.result);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching invitations:", err);
      setError("Failed to load invitations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading invitations...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-5">Invitations</h1>
      <div className="bg-white shadow rounded p-5">
        {invitations.length === 0 ? (
          <p className="text-gray-500">No invitations available.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {invitations.map((invitation) => (
              <li key={invitation._id} className="py-4 flex justify-between">
                <div>
                  <p className="text-lg font-medium text-black">
                    {invitation.landlordId.name}
                  </p>
                  <p className="text-sm text-gray-500">{invitation.status}</p>
                </div>
                <Link
                  href={`/invitations/${invitation.token}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InvitationsPage;
