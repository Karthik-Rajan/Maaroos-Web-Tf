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
export const FETCH_DETAIL_REQUEST = "FETCH_DETAIL_REQUEST";
export const FETCH_DETAIL_RESPONSE = "FETCH_DETAIL_RESPONSE";
export const FETCH_MY_CALENDAR_RESPONSE = "FETCH_MY_CALENDAR_RESPONSE"
export const FETCH_REVIEW_RESPONSE = "FETCH_REVIEW_RESPONSE";
export const ADD_CALENDAR_REQUEST = "ADD_CALENDAR_REQUEST";
export const ADD_CALENDAR_RESPONSE = "ADD_CALENDAR_RESPONSE";
export const ADD_REVIEW_REQUEST = "ADD_REVIEW_REQUEST";
export const ADD_REVIEW_ERROR = "ADD_REVIEW_ERROR"