"use client";
import { IUser } from "@/interfaces";
import { getLoggedInUser } from "@/server-actions/user";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function UserDashBoardPage() {
  const [user, setUser] = useState<IUser | null>(null);

  const fetchData = async () => {
    const res = await getLoggedInUser();
    console.log("res", res);

    if (res.success) {
      setUser(res.data);
    } else {
      toast.error(res.message || "Failed to fetch user data");
      console.log(res.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='p-5 flex flex-col gap-5'>
      <h1>User Dashboard</h1>
      {user && (
        <>
          <h1>User ID: {user.id}</h1>
          <h1>User Name: {user.name}</h1>
          <h1>User Email: {user.email}</h1>
        </>
      )}
    </div>
  );
}

export default UserDashBoardPage;
