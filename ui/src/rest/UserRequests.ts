import axios from "axios";
import { User, baseUrl } from "./common";

const authUrl = baseUrl.concat("/auth");

export interface LoginResponse {
  token: string;
  userResponse: User;
}

export const login = async (data: any): Promise<LoginResponse | undefined> => {
  try {
    const res = await axios(authUrl.concat("/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
      },
      data: JSON.stringify({ email: data.email, password: data.password }),
    });
    return await res.data;
  } catch (e) {
    console.log("Login failed: ", e);
    return undefined;
  }
};

export const signup = async (data: any): Promise<User | undefined> => {
  try {
    const res = await axios(authUrl.concat("/signup"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
      },
      data: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name,
      }),
    });
    console.log("New User registered");
    return await res.data;
  } catch (e) {
    console.log("Signup failed: ", e);
    return undefined;
  }
};

export const getUserById = async (
  userId: string
): Promise<User | undefined> => {
  try {
    const res = await axios(authUrl.concat(`/user/${userId}`));
    const user: User = await res.data;
    return user;
  } catch (e) {
    console.log("Error occured during fetching user's data: ", e);
    return undefined;
  }
};
