import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  ListChecks,
  ListCollapse,
  ListTodo,
  LogOut,
  ShoppingBag,
  User2,
  UserSquare,
} from "lucide-react";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function SideBarMenu({
  openSidebar,
  setOpenSidebar,
}: {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const iconSize = 16;
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const pathName = usePathname;
  const router = useRouter();

  const logoutHandler = () => {
    toast.success("Logged out successfully");
    console.log("logout");
    Cookies.remove("token");
    Cookies.remove("role");
    router.push("/?formType=login");
  };

  const userMenuItems: any = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={iconSize} />,
      path: "/user/dashboard",
    },
    {
      title: "Packages",
      icon: <ShoppingBag size={iconSize} />,
      path: "/user/packages",
    },
    {
      title: "Bookings",
      icon: <ListChecks size={iconSize} />,
      path: "/user/bookings",
    },
    {
      title: "Profile",
      icon: <UserSquare size={iconSize} />,
      path: "/user/profile",
    },
  ];

  const adminMenuItems: any = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={iconSize} />,
      path: "/admin/dashboard",
    },
    {
      title: "Packages",
      icon: <ListTodo size={iconSize} />,
      path: "/admin/packages",
    },
    {
      title: "Bookings",
      icon: <ListCollapse size={iconSize} />,
      path: "/admin/bookings",
    },
    {
      title: "Members",
      icon: <ListChecks size={iconSize} />,
      path: "/admin/members",
    },
    {
      title: "Users",
      icon: <User2 size={iconSize} />,
      path: "/admin/users",
    },
  ];

  const menuItems = user?.role === "admin" ? adminMenuItems : userMenuItems;

  return (
    <>
      <Sheet open={openSidebar} onOpenChange={open => setOpenSidebar(open)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>
          <div className='flex flex-col gap-12 mt-14 px-7'>
            {menuItems.map((item: any, index: number) => (
              <div
                key={item.title}
                className={`flex gap-5 items-center p-3 cursor-pointer hover:bg-gray-200 rounded-md ${
                  pathName() === item.path
                    ? "bg-gray-100 border border-gray-500 text-primary"
                    : " "
                }`}
                onClick={() => {
                  setOpenSidebar(false);
                  router.push(item.path);
                }}
              >
                {item.icon}
                <div className='text-sm '>{item.title}</div>
              </div>
            ))}
            <Button onClick={logoutHandler} className='w-full cursor-pointer  '>
              <LogOut size={14} />
              Logout
            </Button>
          </div>
          {/* 
            <SheetFooter>
              <SheetClose asChild>
                <Button type='submit'>Save changes</Button>
              </SheetClose>
            </SheetFooter> */}
        </SheetContent>
      </Sheet>
    </>
  );
}

export default SideBarMenu;
