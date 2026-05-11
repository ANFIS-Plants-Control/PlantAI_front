import { create } from "zustand";
import { User, UserForm } from "../entities/user/user";
import { getToken } from "../pages/Authentication/api/api";

interface UserStoreType {
  token: string | undefined;
  user: User | undefined;
  setToken: (user: UserForm) => void;
  setUser: () => void;
}

export const useUserStore = create<UserStoreType>((set, get) => ({
  token: undefined,
  user: undefined,
  setToken: async (user: UserForm) => {
    const token = await getToken(user);
    set({ token: token });
    get().setUser();
  },
  setUser: () => {
    const parts = (get().token as string).split(".");
    const payload = JSON.parse(atob(parts[1]));
    const user: User = { Login: payload.login, Role: payload.role };
    set({ user: user });
  },
}));
