import { USER_LOGIN, USER_LOGOUT, USER_UPDATE } from "./actionTypes";

export const userLoginAction = (user: any) => {
  return {
    type: USER_LOGIN,
    payload: user,
  };
};
export const userLogOutAction = () => {
  return {
    type: USER_LOGOUT,
    payload: {},
  };
};

export const userUpdateAction = (name: any) => {
  return {
    type: USER_UPDATE,
    payload: name,
  };
};
