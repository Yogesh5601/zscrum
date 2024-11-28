"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string> | null>(null); // Allow null initially
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const handleEdit = (field: string) => {
    // Prevent editing of email or rating fields
    if (field === "email" || field === "ratings") {
      return;
    }
    setIsEditing(field);
  };

  const email = session?.user?.email;
  const handleSave = async (field: string) => {
    if (!fields || !email) {
      console.error("Missing required data (fields or email).");
      return;
    }

    const updatedField = { [field]: fields[field as keyof typeof fields] };

    if (!updatedField[field]) {
      console.error("Field value is empty or invalid.");
      return;
    }

    // Prevent saving email or rating fields
    if (field === "email" || field === "ratings") {
      console.error(`Cannot update ${field}`);
      return;
    }

    try {
      // Send the update request
      const response = await axios.post("/api/user/add-user", {
        email,
        updatedField,
      });

      if (response.status === 200) {
        console.log("Field updated successfully!");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error updating field:", error);
    }

    setIsEditing(null); // Exit edit mode
  };

  const handleCancel = () => {
    setIsEditing(null); // Exit edit mode without saving
  };

  const handleChange = (field: string, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const getUserDetails = async () => {
    try {
      const email =  session?.user?.email ;
      const response = await axios.get("/api/user/get-user", {
        params: {
          email,
        },
      });
      setFields(response.data.result); // Set fields with API response
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsLoading(false); // End loading state
    }
  };

  useEffect(() => {
    if (session && status === "authenticated") {
      getUserDetails();
    }
  }, [session, status]);

  if (isLoading || !fields) {
    return <div>Loading...</div>; // Fallback UI during loading
  }

  return (
    <div className="w-full min-h-screen bg-white flex px-28">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-50 text-black p-4">
        <ul>
          <li className="p-2 bg-blue-400 rounded mb-2">Basic Info</li>
          <li className="p-2 hover:bg-blue-200 rounded">Points</li>
          <li className="p-2 hover:bg-blue-200 rounded">Account</li>
          <li className="p-2 hover:bg-blue-200 rounded">Lab</li>
          <li className="p-2 hover:bg-blue-200 rounded">Privacy</li>
          <li className="p-2 hover:bg-blue-200 rounded">Notifications</li>
          <li className="p-2 hover:bg-blue-200 rounded">Billing</li>
          <li className="p-2 hover:bg-blue-200 rounded">Orders</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6 shadow rounded">
        <h1 className="text-lg font-bold mb-4">Basic Info</h1>
        <div className="space-y-4">
          {Object.keys(fields).map((key) => (
            <div
              key={key}
              className="grid grid-cols-3 gap-4 items-center border-b pb-2"
            >
              {/* Placeholder Column */}
              <p className="text-gray-500 capitalize">
                {key.replace("_", " ")}
              </p>

              {/* Value or Input Column */}
              <div>
                {isEditing === key ? (
                  key === "role" ? (
                    <select
                      value={fields[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="border border-gray-500 rounded p-2 w-full bg-white text-black"
                    >
                      <option value="Landlord">Landlord</option>
                      <option value="Tenant">Tenant</option>
                      <option value="Property Manager">Property Manager</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={fields[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      placeholder={`Enter ${key.replace("_", " ")}`}
                      className="border border-gray-500 rounded p-2 w-full bg-white text-black"
                    />
                  )
                ) : (
                  <p className="text-gray-600">
                    {fields[key] || "Not provided"}
                  </p>
                )}
              </div>

              {/* Action Button Column */}
              <div className="flex space-x-2 justify-end">
                {isEditing === key ? (
                  <>
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded"
                      onClick={() => handleSave(key)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 text-gray-800 px-4 py-1 rounded"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEdit(key)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
