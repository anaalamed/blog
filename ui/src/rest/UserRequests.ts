import { User, baseUrl } from "./common";

const authUrl = baseUrl.concat("/auth");

export interface LoginResponse {
  token: string;
  userResponse: User;
}

export const login = async (data: any): Promise<LoginResponse> => {
  try {
    const res = await fetch(authUrl.concat("/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    return await res.json();
  } catch (e) {
    console.log("Login failed: ", e);
    throw e;
  }
};

export const signup = async (data: any): Promise<User> => {
  try {
    const res = await fetch(authUrl.concat("/signup"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name,
      }),
    });
    console.log("New User registered");
    return await res.json();
  } catch (e) {
    console.log("Signup failed: ", e);
    throw e;
  }
};
