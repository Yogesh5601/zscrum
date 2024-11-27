"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import InviteModal from "../SendInvite";
import axios from "axios";

const ProfileCard = ({ logedInUser}) => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row gap-4 p-6 bg-[#1a1a1a] text-white px-28">
      {/* Left Side */}
      <div className="w-3/12 flex flex-col items-center bg-[#282828] rounded-lg p-5 gap-4">
        <div className="w-full flex flex-col items-center bg-[#282828] gap-4">
          <div className="w-full flex gap-4">
            <div className="w-32">
              <img
                src={`${session?.user.image}`}
                alt="Profile Picture"
                className="rounded-lg w-full"
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col w-full">
                <h2 className="text-base font-bold">shrivasyogesh2000</h2>
                <p className="text-gray-400 text-sm">shrivasyogesh2000</p>
              </div>
              <p className="text-base">Rank ~5,000,000</p>
            </div>
          </div>
          <div className="w-full flex  text-center">
            <Link
              href={`/profile`}
              className="w-full text-[#2cbb5d] bg-[#339f595d] px-4 py-2 rounded"
            >
              Edit Profile
            </Link>
          </div>
          <div className="w-full flex  text-center">
            <div
              onClick={handleOpen}
              className="w-full text-[#2cbb5d] bg-[#339f595d] px-4 py-2 rounded"
            >
              Add Tenent
            </div>
          </div>
          <div className="w-full flex  text-center">
            <Link
              href={`/tenants`}
              className="w-full text-[#2cbb5d] bg-[#339f595d] px-4 py-2 rounded"
            >
              Tenants
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 text-sm text-[#eff2f6a1]">
          <div className="text-base">Community Stats</div>
          <div className="w-full flex flex-col gap-2">
            <div className="">
              <div className="">views: 0</div>
              <div className="text-xs text-[#eff2f68c]">Last Week: 0</div>
            </div>
            <div className="">
              <div className="">Solution: 0</div>
              <div className="text-xs text-[#eff2f68c]">Last Week: 0</div>
            </div>
            <div className="">
              <div className="">Discuss: 0</div>
              <div className="text-xs text-[#eff2f68c]">Last Week: 0</div>
            </div>
            <div className="">
              <div className="">Reputation: 0</div>
              <div className="text-xs text-[#eff2f68c]">Last Week: 0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-9/12 flex-1 grid grid-cols-1 md:grid-cols-2  gap-6">
        {/* Stats Section */}
        <div className="p-4 rounded-lg bg-[#282828]">
          <h3 className="text-sm font-semibold text-gray-400">
            Community Stats
          </h3>
          <div className="mt-2 space-y-2">
            <p className="flex justify-between">
              <span>Views</span>
              <span>0</span>
            </p>
            <p className="flex justify-between">
              <span>Solution</span>
              <span>0</span>
            </p>
            <p className="flex justify-between">
              <span>Discuss</span>
              <span>0</span>
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="p-4 bg-[#282828] rounded-lg">
          <h3 className="text-sm font-semibold text-gray-400">Progress</h3>
          <div className="flex justify-between mt-2">
            <div>
              <p>Easy</p>
              <p className="text-lg font-bold">0/837</p>
            </div>
            <div>
              <p>Med.</p>
              <p className="text-lg font-bold">0/1756</p>
            </div>
            <div>
              <p>Hard</p>
              <p className="text-lg font-bold">0/766</p>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="p-4 bg-[#282828] rounded-lg">
          <h3 className="text-sm font-semibold text-gray-400">Badges</h3>
          <p className="text-lg font-bold mt-2">0</p>
          <p className="text-sm text-gray-500">Locked Badge</p>
          <p className="text-sm">Nov Challenge</p>
        </div>

        {/* Submissions Section */}
        <div className="p-4 bg-[#282828] rounded-lg">
          <h3 className="text-sm font-semibold text-gray-400">
            Submissions in the past one year
          </h3>
          {/* Placeholder for submission chart (use a library if needed) */}
          <div className="flex items-center justify-center h-32 bg-gray-700 rounded mt-4">
            <p className="text-gray-500">Activity chart here</p>
          </div>
        </div>
      </div>

      <InviteModal
        isOpen={isModalOpen}
        onClose={handleClose}
        logedInUser={logedInUser}
      />
    </div>
  );
};

export default ProfileCard;
