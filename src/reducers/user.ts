import { userProfile } from "../actions";

const initialState = {};
async function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case "USER_PROFILE_FETCH":
      return await userProfile().then((res: any) => {
        return res;
      });
    default:
      return state;
  }
}
export default userReducer;
