import { User, baseUrl } from "./common";

const authUrl = baseUrl.concat("/auth");

export const login = async (data: any): Promise<string> => {
  try {
    const res = await fetch(authUrl.concat("/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        charset: "utf-8",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    const resData: any = await res.json();
    return resData.token;
  } catch (e) {
    console.log("Error occured during fetching posts: ", e);
    throw e;
  }
};
