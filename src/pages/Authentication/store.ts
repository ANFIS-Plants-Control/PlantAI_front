import { create } from "zustand";
import { UserForm } from "../../entities/user/user";

interface IAuthenticationStore {
  mode: "signin" | "signup";
  buttonStatus: boolean;
  user: UserForm;
  updateButtonStatus: (status: boolean) => void;
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
    updateButtonStatus: (status: boolean) => {
      set({ buttonStatus: status });
    },
    updateUser: <T extends keyof UserForm>(obj: T, value: UserForm[T]) => {
      const editUser = get().user;
      if (editUser) {
        set({ user: { ...editUser, [obj]: value } });
      }
      if (get().user.Login !== "" && get().user.Password !== "")
        get().updateButtonStatus(false);
      else get().updateButtonStatus(true);
    },
  }),
);
