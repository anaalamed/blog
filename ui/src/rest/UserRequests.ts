import axios from "axios";
import { baseUrl } from "./common";

const authUrl = baseUrl.concat("/auth");

export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

export interface UserValues {
  name?: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userResponse: User;
}

export const login = async (
  data: UserValues
): Promise<LoginResponse | undefined> => {
  try {
    const res = await axios(authUrl.concat("/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
      },
      data: JSON.stringify(data),
    });
    return await res.data;
  } catch (e) {
    console.log("Login failed: ", e);
    return undefined;
  }
};

export const signup = async (data: UserValues): Promise<User | undefined> => {
  try {
    const res = await axios(authUrl.concat("/signup"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
      },
      data: JSON.stringify(data),
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
