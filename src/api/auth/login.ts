import { AxiosResponse } from "axios";
import { api } from "..";

interface ILogin {
  username: string;
  passwordUser: string;
}

export interface RespLoginSuccess {
  username: string;
  email: string;
  error?: never;
}

export interface RespLoginError {
  username?: never;
  email?: never;
  error: any;
}

export type RespLogin = RespLoginSuccess | RespLoginError;

export const loginUser = async ({ username, passwordUser }: ILogin): Promise<RespLogin> => {
  try {
    const response: AxiosResponse = await api.post(
      `/users/guest/login`,
      {
        username: username,
        password: passwordUser,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};
