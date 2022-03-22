import { USER_LOGIN, USER_LOGOUT, USER_UPDATE } from "./actionTypes";

const userInitialState = {
  currentUser: {},
};

export const userReducer = (state = userInitialState, action: any) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, currentUser: action.payload };
    case USER_LOGOUT:
      return { ...state, currentUser: {} };
    case USER_UPDATE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          data: {
            //@ts-ignore
            ...state.currentUser.data,
            name: {
              ...action.payload,
            },
          },
        },
      };
    default:
      return state;
  }
};
