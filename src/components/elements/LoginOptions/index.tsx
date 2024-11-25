import SignIn from "@/components/sign-in";
import SignUp from "@/components/sign-up";
import React, { useState } from "react";

const LoginSelector = () => {
  const [selectedOption, setSelectedOption] = useState(""); // Track selected option
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

  const handleChange = (event: any) => {
    const value = event.target.value;
    setSelectedOption(value);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOption("");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-100">
      {/* Dropdown */}
      <select
        value={selectedOption}
        onChange={handleChange}
        className="border border-gray-500 rounded p-2 w-full bg-white text-black"
      >
        <option value="" disabled>
          Login
        </option>
        <option value="tenant">Login Tenant</option>
        <option value="landlord">Login Landlord</option>
      </select>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Sign up or Log in
            </h2>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button className="w-full bg-blue-500 text-white rounded py-2 font-semibold hover:bg-blue-600 transition">
              Submit
            </button>

            {/* OR Divider */}
            <div className="text-center my-4 text-gray-500">OR</div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-3">
              <SignIn />
              <SignUp />
            </div>

            {/* Terms and Policy */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              I accept Trulia&apos;s{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSelector;
