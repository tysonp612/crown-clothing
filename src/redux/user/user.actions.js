import { UserActionTypes } from "./user.types";

//take one parameter as the subject that we are selecting
const setCurrentUser = (user) => {
  return { type: UserActionTypes.SET_CURRENT_USER, payload: user };
};

export default setCurrentUser;
