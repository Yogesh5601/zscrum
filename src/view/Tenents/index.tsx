"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const TenentsPage = () => {
  const { data: session, status } = useSession();

  const fetchTenants = async () => {
    try {
      const response = await axios.get("/api/tenants", {
        params: {
          email: session.user.email,
        },
      });
      console.log(response);
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
