import Cookies from "js-cookie";

export const baseUrl = "http://localhost:8080";

export const headers = {
  "Content-Type": "application/json",
  charset: "utf-8",
  Authorization: Cookies.get("Authorization"),
};
