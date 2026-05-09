import { create } from "zustand";
import { User, UserForm } from "../../entities/user/user";

interface IAuthenticationStore {
  mode: "signin" | "signup";
  buttonStatus: boolean;
  user: UserForm;
  updateButtonStatus: () => void;
  updateMode: () => void;
  updateUser: <T extends keyof UserForm>(obj: T, val: UserForm[T]) => void;
}

export const useAuthenticationStore = create<IAuthenticationStore>(
  (set, get) => ({
    mode: "signin",
    buttonStatus: true,
    user: { Login: "", Password: "", RoleId: 1 },
    updateMode: () => {
      set({ mode: get().mode === "signin" ? "signup" : "signin" });
    },
    updateButtonStatus: () => {
      set({ buttonStatus: get().buttonStatus === true ? false : true });
    },
    updateUser: <T extends keyof UserForm>(obj: T, value: UserForm[T]) => {
      const editUser = get().user;
      if (editUser) {
        set({ user: { ...editUser, [obj]: value } });
      }
    },
  }),
);
