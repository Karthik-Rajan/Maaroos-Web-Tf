import { CREATE_WALLET_RECHARGE_RESPONSE, FETCH_PROFILE_REQUEST, FETCH_PROFILE_RESPONSE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESPONSE, WALLET_ENTRY_REQUEST, WALLET_ENTRY_RESPONSE, WALLET_STATEMENT_RESPONSE } from "../constants/user";

const initialState = {
  profile: {
    loading: false,
    error: null,
    data: {}
  },
  wallet: {},
  statements: []
};
const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return { ...state, profile: { ...state.profile, loading: true } }
    case FETCH_PROFILE_RESPONSE:
      return { ...state, profile: { ...state.profile, loading: false, data: action.payload } }
    case UPDATE_PROFILE_REQUEST:
      return { ...state }
    case WALLET_ENTRY_RESPONSE:
      return { ...state, wallet: { ...state.wallet, loading: false, data: action.payload } }
    case CREATE_WALLET_RECHARGE_RESPONSE:
      return { ...state }
    case WALLET_STATEMENT_RESPONSE:
      return { ...state, ...action.payload }
    default:
      return state;
  }
}
export default userReducer;
