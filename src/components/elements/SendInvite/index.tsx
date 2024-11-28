import axios from "axios";
import React, { useState } from "react";

const InviteModal = ({ isOpen, onClose, logedInUser }) => {
  if (!isOpen) return null;
  const [invitationEmail, setInvitationEmail] = useState("");

  const sendInvitation = async () => {
    try {
      const response = await axios.post("/api/invite/send-invite", {
        landlordId: logedInUser._id,
        tenantEmail: invitationEmail,
      });
      // console.log(response,'response');
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Tenant</h2>
        {/* Your form or modal content goes here */}
        <form>
          <input
            type="text"
            placeholder="example@gmail.com"
            className="mb-4 p-2 w-full border border-gray-300 rounded"
            onChange={(e) => setInvitationEmail(e.target.value)}
          />
          {/* Add other fields as necessary */}
        </form>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose} // Call onClose function passed from parent
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Close
          </button>
          <button
            onClick={sendInvitation}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
