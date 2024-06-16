import { AxiosResponse } from "axios";
import { api } from "..";

interface ISignUp {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface RespLoginSuccess {
  username: string;
  email: string;
  error?: never;
}

export interface RespLoginError {
  error: any;
  username?: never;
  email?: never;
}

export type RespSign = RespLoginSuccess | RespLoginError;

export const signUpGuestUser = async ({
  username,
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
}: ISignUp): Promise<RespSign> => {
  try {
    const response: AxiosResponse = await api.post(
      "/users/guest",
      {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return { error };
  }
};
