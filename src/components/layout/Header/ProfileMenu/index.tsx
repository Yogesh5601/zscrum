import React, { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import SignOut from "@/components/sign-out";
import Link from "next/link";

interface ProfileMenuProps {
  open: boolean;
  handleClose: () => void;
}

const menuLinks = [
  { name: "Dashboard", url: "/dashboard" },
  { name: "Profile", url: "/profile" },
  { name: "Tenents", url: "/tenents" },
  { name: "Points", url: "/points" },
];

const ProfileMenu: React.FC<ProfileMenuProps> = ({ open, handleClose }) => {
  const { data: session } = useSession();
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, handleClose]);



  return (
    <>
      {/* Modal */}
      {open && (
        <div
          ref={menuRef}
          className="fixed right-5 mt-7 w-72 bg-gray-800 text-gray-300 rounded-lg shadow-lg z-50 "
        >
          <div className="p-4">
            {/* Header */}
            <Link
              href={"/profile"}
              className="flex items-center p-4 border-b border-gray-700"
            >
              <img
                src={`${session?.user?.image}`}
                alt="Profile_image"
                width={40}
                height={40}
                className="rounded-full mr-4"
              />
              <div>
                <h3 className="text-white font-semibold">
                  {session?.user?.name}
                </h3>
                <p className="text-sm text-gray-400">
                  Access all features with our Premium subscription!
                </p>
              </div>
            </Link>

            {/* Menu Items */}
            <ul className="w-full py-2 ">
              {menuLinks.map((item, index) => (
                <li key={index} className="w-full px-4 py-2 hover:bg-gray-700 hover:cursor-pointer rounded-lg">
                  <Link href={`${item.url}`} className="w-full flex">{item.name}</Link>
                </li>
              ))}

              <li className="w-full px-4 py-2 hover:bg-gray-700 hover:cursor-pointer rounded-lg">
                <SignOut />
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-1 bg-transparent bg-opacity-10 z-40"
          onClick={handleClose}
        ></div>
      )}
    </>
  );
};

export default ProfileMenu;
