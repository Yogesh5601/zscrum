"use client";
import { RootState } from "@/stores";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const TenentsPage = () => {
  const { data: session, status } = useSession();
   const loggedInUser = useSelector(
     (state: RootState) => state.generals.logedInuser
   );

  const fetchTenants = async () => {
    try {
      const response = await axios.get("/api/tenants", {
        params: {
          _id: loggedInUser._id,
        },
      });
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, [session, status]);
  return <div>TenentsPage</div>;
};

export default TenentsPage;
