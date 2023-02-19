import { vendorList, vendorDetail, fetchMySchedule } from "../actions";

const commonState = {
  location: {
    coordinates: {
      lat: 0,
      lng: 0,
    },
    name: "",
  },
  search: {
    lat: 0,
    lng: 0,
    rating_avg: 0,
    distance: 5,
    is_veg: "NO",
  },
  list: [],
  detail: {},
};
const initialState = {
  location: commonState.location,
  list: commonState.list,
  search: commonState.search,
  detail: commonState.detail,
  myCalendar: [],
};

const reducer = async (state = initialState, action: any) => {
  switch (action.type) {
    case "LOCATION":
      return await vendorList({
        search: {
          ...commonState.search,
          ...action.payload.search,
        },
        location: action.payload.location,
      }).then((res: any) => {
        return res;
      });
    case "DETAIL":
      let detail = {};
      await vendorDetail({ ...action.payload }).then((res: any) => {
        detail = res;
      });
      return detail;

    case "MY_CALENDAR":
      return await fetchMySchedule({ ...action.payload }).then((res: any) => {
        return res;
      });
    default:
      return state;
  }
};
export default reducer;
