import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import { Menu } from "lucide-react";
import React from "react";
import SideBarMenu from "./sidebar-menuItems";

function Header() {
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const [openSidebar, setOpenSidebar] = React.useState(false);

  return (
    <div className='p-5 flex justify-between items-center bg-primary text-white'>
      <div>
        <h1 className='text-xl font-bold font'>Laguna's Gateway</h1>
      </div>
      <div>
        <div className='flex items-center gap-5'>
          <h1 className='text-white text-sm'> {user?.name}</h1>
          <Menu
            onClick={() => setOpenSidebar(true)}
            size={16}
            className='text-white cursor-pointer'
          />
        </div>
      </div>

      {openSidebar && (
        <SideBarMenu
          openSidebar={openSidebar}
          setOpenSidebar={setOpenSidebar}
        />
      )}
    </div>
  );
}

export default Header;
