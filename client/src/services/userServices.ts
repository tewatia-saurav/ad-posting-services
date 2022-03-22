import axios from "axios";
import { userLoginAction } from "../redux/actions";
export const userSignup = async (user: any) => {
  return await axios.post(`/api/user/register`, user);
};

export const userLogin = async (dispatch: any, user: any) => {
  let res = await axios.post("/api/user/login", user);
  dispatch(userLoginAction({ data: res.data.user, token: res.data.token }));
  return res;
};


export const userDetailsUpdate = async (name : any, token: any) => {
 return await axios.post("/api/user/update", {name, token});

}