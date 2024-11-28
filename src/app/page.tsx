"use client";
import ThemeToggle from "@/components/layout/ToggleButton";
import { setLoggedInUser } from "@/stores/reducers/generalReducer";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/user/get-user", {
        params: {
          email: session.user.email,
        },
      });
      // console.log(response.data.result);
      dispatch(setLoggedInUser(response.data.result));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUser();
    }
  }, [session, status]);
  return (
    <div className="w-full">
      <div className="">
        <h1>Hello, tenents</h1>
      </div>
      <div className=" fixed bottom-1 right-1">
        <ThemeToggle />
      </div>
    </div>
  );
}
