import { BASE_URL, ME } from "../constants/user";
import { FETCH, DETAIL, MY_CALENDAR } from "../constants/vendor";
import {
  authHeaders,
  refreshAuth,
  methodProps,
  guestHeaders,
} from "../constants/apis";

let response = {
  type: "",
  search: {},
  location: {},
  list: [],
  detail: {},
};

export const vendorList = async (payload: any) => {
  response = {
    ...response,
    type: "LOCATION",
    search: payload.search,
    location: payload.location,
  };
  return await fetch(BASE_URL + FETCH, {
    ...methodProps("POST", payload.search),
    ...guestHeaders,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return { ...response, list: data };
    });
};

export const userProfile: any = async (
  retry: boolean = true,
  idToken: string = ""
) => {
  let userData = {};
  const response = { type: "USER_PROFILE_FETCH", userData };

  return await fetch(BASE_URL + ME, {
    ...authHeaders(idToken),
    ...methodProps("GET"),
  })
    .then((res: any) => {
      return res.json();
    })
    .then((data: any) => {
      return { ...response, userData: data };
    })
    .catch(async (err: any) => {
      /** Retry Authentication */
      if (retry) {
        const user = await refreshAuth();
        return await userProfile(false, user?.getIdToken()?.getJwtToken());
      }
      console.log("User Login Err", err);
    });
};

export const vendorDetail = async ({ vId }: any) => {
  response = { ...response, type: "DETAIL" };
  return await fetch(BASE_URL + DETAIL + vId, {
    ...methodProps("GET"),
    ...guestHeaders,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return { ...response, detail: data };
    });
};

export const fetchMySchedule = async ({ vId, types, from, to }: any) => {
  response = { ...response, type: "MY_CALENDAR" };
  return await fetch(BASE_URL + `/` + vId + MY_CALENDAR, {
    ...methodProps("POST", { types, from, to }),
    ...authHeaders(),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return { ...response, detail: data };
    });
};