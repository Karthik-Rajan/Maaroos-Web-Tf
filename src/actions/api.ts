import { BASE_URL, ME } from "../constants/user";
import { FETCH, DETAIL, MY_CALENDAR, ADD_CALENDAR, ADD_REVIEW, FETCH_REVIEW } from "../constants/vendor";
import {
  authHeaders,
  refreshAuth,
  methodProps,
  guestHeaders,
} from "../constants/apis";

export const vendorList = async (payload: any) => {
  return await fetch(BASE_URL + FETCH, {
    ...methodProps("POST", { ...payload }),
    ...guestHeaders,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
};

export const userProfile: any = async (
  retry: boolean = true,
  idToken: string = ""
) => {
  let userData = {};
  await fetch(BASE_URL + ME, {
    ...authHeaders(idToken),
    ...methodProps("GET"),
  })
    .then((res: any) => {
      return res.json();
    })
    .then((data: any) => {
      userData = data;
    })
    .catch(async (err: any) => {
      /** Retry Authentication */
      if (retry) {
        const user = await refreshAuth();
        return await userProfile(false, user?.getIdToken()?.getJwtToken());
      }
      console.log("User Login Err", err);
    });
  return await userData;
};

export const userProfileUpdate: any = async (
  payload: object,
  retry: boolean = true,
  idToken: string = ''
) => {
  let userData = {};
  const response = { type: "USER_PROFILE_UPDATE", userData };
  await fetch(BASE_URL + ME, {
    ...authHeaders(idToken),
    ...methodProps("PUT", payload),
  })
    .then((res: any) => {
      return res.json();
    })
    .then((data: any) => {
      return { ...response };
    })
    .catch(async (err: any) => {
      /** Retry Authentication */
      if (retry) {
        const user = await refreshAuth();
        return await userProfileUpdate(payload, false, user?.getIdToken()?.getJwtToken());
      }
      console.log("User Login Update Err", err);
    });
}

export const vendorDetail = async ({ vId }: any) => {
  return await fetch(BASE_URL + DETAIL + vId, {
    ...methodProps("GET"),
    ...guestHeaders,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
};

export const fetchMySchedule: any = async ({ vId, types, from, to, retry = true }: any) => {
  return await fetch(BASE_URL + `/` + vId + MY_CALENDAR, {
    ...methodProps("POST", { types, from, to }),
    ...authHeaders(),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => data)
    .catch(async (err) => {
      /** Retry Authentication */
      if (retry) {
        const user = await refreshAuth();
        return await fetchMySchedule({ vId, types, from, to, retry: false });
      }
      console.log("User Login Err", err);
    });
};

export const addSchedule: any = async ({ vId, fromDate, toDate, foodTypes, retry = true }: any) => {
  const response = { type: "ADD_CALENDAR" };
  return await fetch(BASE_URL + `/` + vId + ADD_CALENDAR, {
    ...methodProps("POST", { fromDate, toDate, foodTypes }),
    ...authHeaders(),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return { ...response, data };
    })
    .catch(async (err) => {
      /** Retry Authentication */
      if (retry) {
        const user = await refreshAuth();
        return await addSchedule({ vId, fromDate, toDate, foodTypes, retry: false });
      }
      console.log("User Login Err", err);
    });
};

export const addReview: any = async ({ vId, rating, comment, retry = true }: any) => {
  return await fetch(BASE_URL + `/` + vId + ADD_REVIEW, {
    ...methodProps("POST", { rating, comment }),
    ...authHeaders(),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => data)
    .catch(async (err) => {
      /** Retry Authentication */
      if (err.code == 401 && retry) {
        const user = await refreshAuth();
        return await addReview({ vId, rating, comment, retry: false });
      }
      throw new Error("");
    });
};

export const fetchReview: any = async ({ vId, retry = true }: any) => {
  return await fetch(BASE_URL + `/` + vId + FETCH_REVIEW, {
    ...methodProps("GET"),
    ...authHeaders(),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => data)
    .catch(async (err) => {
      /** Retry Authentication */
      if (err.code == 401 && retry) {
        const user = await refreshAuth();
        return await addReview({ vId, retry: false });
      }
      console.log("User Login Err", err);
    });
};

export const rz_WalletEntry: any = async ({ amount, retry = true }: any) => {
  let data = {};
  await fetch(BASE_URL + ME + `/wallet`, {
    ...methodProps("POST", { amount }),
    ...authHeaders(),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data = data;
    })
    .catch(async (err) => {
      /** Retry Authentication */
      if (err.code == 401 && retry) {
        const user = await refreshAuth();
        return await rz_WalletEntry({ amount, retry: false });
      }
      console.log("User Login Err", err);
    });
  return await data
};

export const rechargeWallet = (props: any) => {
  fetch(BASE_URL + ME + `/wallet/recharge`, {
    ...methodProps("POST", { ...props }),
    ...authHeaders(),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data = data;
    })
    .catch(async (err) => {

    });
}