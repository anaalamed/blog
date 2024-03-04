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
    console.log("Error occured during fetching posts: ", e);
    throw e;
  }
};
