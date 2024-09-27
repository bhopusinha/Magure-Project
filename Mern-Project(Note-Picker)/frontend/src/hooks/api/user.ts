import { User, userLogin, userRegister } from "../../types/user";
import api from "../axios/api";

export async function getLoggedInUser(): Promise<User | undefined> {
  try {
    const response = await api.post(`/api/user/`);

    return response.data;
  } catch (error) {
    console.log(error);

    alert(error.response.data.error);
    
  }
}

export async function SignUpcredential(
  input: userRegister
): Promise<User | undefined> {
  try {
    const response = await api.post(`/api/user/signup`, input);

    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.response.data.error);
  }
}

export async function loginUser(input: userLogin): Promise<User | undefined> {
  try {
    const response = await api.post(`/api/user/login`, input);
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.response.data.error);
  }
}

export async function LogoutUser() {
  await api.post(`/api/user/logout`);
}
