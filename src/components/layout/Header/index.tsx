"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import ProfileMenu from "@/components/layout/Header/ProfileMenu";
import LoginSelector from "@/components/elements/LoginOptions";
import Link from "next/link";

// const menuLinks = [
//   { name: "Dashboard", url: "/dashboard" },
//   { name: "Profile", url: "/profile" },
//   { name: "Tenents", url: "/tenents" },
//   { name: "Points", url: "/points" },
// ];

const Header = () => {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div className="w-full flex justify-between items-center px-6 py-2 border-b border-black">
      <div className="w-8/12">
        <Link className="text-xl font-bold" href={`/`}>Header</Link>
      </div>
      {/* <div className="">
        <ul className="w-full flex gap-2">
          {menuLinks.map((item, index) => (
            <li key={index}>
              <Link href={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div> */}
      <div className="w-4/12 flex">
        {status === "unauthenticated" ? (
          <LoginSelector />
        ) : (
          <div className="w-full flex items-end gap-4 justify-end">
            <div className="px-4 py-2 border rounded cursor-pointer"> I am landloard</div>
            <div className="px-4 py-2 border rounded cursor-pointer"> Submit a Review</div>
            <img
              src={session?.user?.image || "/default-avatar.png"}
              alt="Profile"
              className="w-[40px] h-[40px] rounded-full cursor-pointer"
              onClick={handleOpen}
            />
          </div>
        )}
      </div>
      {status === "authenticated" && (
        <div className="absolute">
          <ProfileMenu
            // anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            handleClose={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
