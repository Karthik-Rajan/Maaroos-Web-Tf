import { BASE_URL as baseUrl } from "./apis";
export const BASE_URL = baseUrl;
export const FETCH = "/vendor/list";
export const DETAIL = "/vendor/";
export const MY_CALENDAR = "/subscription";
export const ADD_CALENDAR = MY_CALENDAR + `/add`;
export const FETCH_REVIEW = "/review";
export const ADD_REVIEW = FETCH_REVIEW + "/add"

export const SET_LOCATION = "SET_LOCATION"
export const FETCH_VENDOR_REQUEST = "FETCH_VENDOR_REQUEST";
export const LOCATION = "LOCATION";