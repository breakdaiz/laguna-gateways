import React, { use } from "react";
import Header from "./header";
import { getLoggedInUser } from "@/server-actions/user";
import usersGlobalStore, {
  IUsersGlobalStore,
} from "@/global-store/users-store";
import { set } from "zod";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function PrivateLayoutProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);
  const { setUser } = usersGlobalStore() as IUsersGlobalStore;
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await getLoggedInUser();
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        throw new Error(response.message || "Failed to fetch user data");
      }
    } catch (error) {
      toast.error("failed to fetch user data, please login again");

      Cookies.remove("jwt_token");
      Cookies.remove("role");
      router.push("/?formType=login");
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default PrivateLayoutProvider;
