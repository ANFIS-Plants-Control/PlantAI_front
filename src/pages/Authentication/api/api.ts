import { UserForm } from "../../../entities/user/user";

export async function getToken(userForm: UserForm): Promise<string> {
  const response = await fetch("http://localhost:8080/api/users/get_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ Login: "test", Password: "test" }),
  });
  if (!response.ok) throw new Error("incorrect user login or password");
  else {
    const data = await response.json();
    return data;
  }
}

export async function createUser(userForm: UserForm) {
  const response = await fetch("http://localhost:8080/api/users/get_token", {
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
    return data;
  }
}
