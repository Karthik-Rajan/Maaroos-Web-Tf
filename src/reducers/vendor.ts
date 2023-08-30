import { vendorList, vendorDetail, fetchMySchedule, addSchedule, addReview, fetchReview } from "../actions/api";
import { ADD_CALENDAR_REQUEST, ADD_CALENDAR_RESPONSE, ADD_REVIEW_ERROR, ADD_REVIEW_REQUEST, FETCH_DETAIL_REQUEST, FETCH_DETAIL_RESPONSE, FETCH_MY_CALENDAR_RESPONSE, FETCH_REVIEW_RESPONSE, FETCH_VENDOR_REQUEST, LOCATION, SET_LOCATION } from "../constants/vendor";

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
  reviews: [],
  error: null
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state, loading: false, search: { ...state.search, ...action.payload }
      }
    case FETCH_VENDOR_REQUEST:
    case FETCH_DETAIL_REQUEST:
    case ADD_CALENDAR_REQUEST:
      return { ...state, loading: true }
    case LOCATION:
    case FETCH_DETAIL_RESPONSE:
    case FETCH_MY_CALENDAR_RESPONSE:
    case FETCH_REVIEW_RESPONSE:
    case ADD_REVIEW_REQUEST:
      return {
        ...state, loading: false, ...action.payload
      }
    case ADD_CALENDAR_RESPONSE:
      return addSchedule({ ...action.payload }).then((res: any) => res);
    default:
      return state;
  }
};
export default reducer;
