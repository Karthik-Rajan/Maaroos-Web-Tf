import { vendorList, vendorDetail, fetchMySchedule, addSchedule, addReview, fetchReview } from "../actions/api";
import { FETCH_VENDOR_REQUEST, LOCATION, SET_LOCATION } from "../constants/vendor";

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
  loading: false,
  location: commonState.location,
  list: commonState.list,
  search: commonState.search,
  detail: commonState.detail,
  myCalendar: [],
  reviews: []
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state, loading: false, search: { ...state.search, ...action.payload }
      }
    case FETCH_VENDOR_REQUEST:
      return { ...state, loading: true }
    case LOCATION:
      return {
        ...state, ...action.payload
      }
    case "DETAIL":
      return vendorDetail({ ...action.payload }).then((res: any) => {
        return {
          ...initialState,
          detail: res
        }
      });
    case "MY_CALENDAR":
      return fetchMySchedule({ ...action.payload }).then((res: any) => res);
    case "ADD_CALENDAR":
      return addSchedule({ ...action.payload }).then((res: any) => res);
    case "ADD_REVIEW":
      return addReview({ ...action.payload }).then((res: any) => res);
    case "FETCH_REVIEW":
      return fetchReview({ ...action.payload }).then((res: any) => {
        return {
          ...initialState,
          reviews: res
        }
      })
    default:
      return state;
  }
};
export default reducer;
