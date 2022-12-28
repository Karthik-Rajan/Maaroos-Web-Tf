const initialState = {
  sideBar: false,
};
async function commonReducer(state = initialState, action: any) {
  switch (action.type) {
    case "SIDEBAR":
      return {
        ...initialState,
        sideBar: !action.sideBar,
      };
    default:
      return state;
  }
}

export default commonReducer;
