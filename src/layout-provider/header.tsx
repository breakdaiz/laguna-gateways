import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import React from "react";

function Header() {
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  return (
    <div className='p-5 flex justify-between items-center bg-primary text-white'>
      <div>
        <h1 className='text-xl font-bold font'>Laguna's Gateway</h1>
      </div>
      <div>
        <div className='flex items-center gap-5'>
          <h1 className='text-white text-sm'>a {user?.name}</h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
