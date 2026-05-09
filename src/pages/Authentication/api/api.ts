import { UserForm } from "../../../entities/user/user";
import { useUserStore } from "../../../stores/UserStore";

export async function getToken(userForm: UserForm) {
  const userStore = useUserStore();
  const response = await fetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userForm),
  });
  if (!response.ok) throw new Error("incorrect user login or password");
  else {
    const data = await response.json();
    userStore.setToken(data.token);
    userStore.setUser();
  }
}

export async function createUser(userForm: UserForm) {
  const userStore = useUserStore();
  const response = await fetch("", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userForm),
  });
  if (!response.ok) throw new Error("incorrect user login or password");
  else {
    const data = await response.json();
    userStore.setToken(data.token);
    userStore.setUser();
  }
}
