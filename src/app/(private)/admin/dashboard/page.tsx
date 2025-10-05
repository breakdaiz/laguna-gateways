import { IUser } from "@/interfaces";
import { getLoggedInUser } from "@/server-actions/user";
import React from "react";

async function AdminDashBoardPage() {
  const response = await getLoggedInUser();
  if (!response.success) {
    return <div className='p-5'>{response.message}</div>;
  }
  const user: IUser = response.data;
  return (
    <div className='p-5 flex flex-col gap-5'>
      <h1>User ID: {user.id}</h1>
      <h1>User Name: {user.name}</h1>
      <h1>User Email: {user.email}</h1>
    </div>
  );
}

export default AdminDashBoardPage;
