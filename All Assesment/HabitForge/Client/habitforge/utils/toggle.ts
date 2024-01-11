import { makeRequest } from "../axios/axios";

export const getCookie = (name: string): string | null => {
  const nameLenPlus = name.length + 1;
  const cookies = document.cookie.split(";").map((c) => c.trim());

  const matchingCookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));

  return matchingCookie ? decodeURIComponent(matchingCookie.substring(nameLenPlus)) : null;
};

export const cookieValid = async (): Promise<boolean> => {
  try {
    const res = await makeRequest.get("/user/me");

    // Check for a successful response (status code 200)
    return res.status === 200;
  } catch (error) {
    // Log or handle the error appropriately
    console.error("Error checking session validity:", error);
    return false;
  }
};
