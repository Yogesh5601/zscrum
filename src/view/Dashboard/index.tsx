"use client";
import ProfileCard from "@/components/elements/ProfileCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
const {data:session, status} = useSession()
const [logedInUser, setLogenInUser] = useState({});
const email = session.user.email
  const getLogedInUser = async() => {
    try {
      const response = await axios.get(`/api/user/get-user`, {
        params: { email },
      });
       console.log(response,"response")
       setLogenInUser(response.data.result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getLogedInUser();
  },[session,status])

  return (
    <div>
      <ProfileCard logedInUser={logedInUser} />
    </div>
  );
}
