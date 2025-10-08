import { IUser } from "@/interfaces";
import { create } from "zustand";

const usersGlobalStore = create(set => ({
  user: null,
  setUser: (payload: IUser) => set({ user: payload }),
}));

export default usersGlobalStore;

export interface IUsersGlobalStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
}
