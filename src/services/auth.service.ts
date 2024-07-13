

import { decodedToken } from "@/utils/jwt";
import { instance as axiosInstance } from '@/helpers/axios/axiosInstance';
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/local-storage";
import { authKey } from "@/constants/authKey";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken);
};
export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role.toLowerCase(),
    };
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};

export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};



export const getNewAccessToken = async () => {
  try {
    const response = await axiosInstance({
      url: 'http://localhost:5000/api/refresh-token',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    console.log("New access token response:", response);
    return response;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
};

