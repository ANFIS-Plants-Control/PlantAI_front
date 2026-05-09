import { create } from "zustand";
import { User } from "../entities/user/user";

interface TokenStoreType {
  token: string;
  user: User | undefined;
  setToken: (token: string) => void;
  setUser: () => void;
}

export const useUserStore = create<TokenStoreType>((set, get) => ({
  token: " ",
  user: undefined,
  setToken: (token: string) => {
    set({ token: token });
  },
  setUser: () => {
    const parts = (get().token as string).split(".");
    const payload = JSON.parse(atob(parts[1]));
    const user: User = { Login: payload.Login, Role: payload.RoleId };
    set({ user: user });
  },
}));
