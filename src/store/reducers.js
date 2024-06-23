import { combineReducers } from "redux";
import {
  ADVERTS_LOADED_PENDING,
  ADVERTS_LOADED_FULFILLED,
  ADVERTS_LOADED_REJECTED,
  ADVERT_SINGLE_PENDING,
  ADVERT_SINGLE_FULFILLED,
  ADVERT_SINGLE_REJECTED,
  CREATE_ADVERT_PENDING,
  CREATE_ADVERT_FULFILLED,
  CREATE_ADVERT_REJECTED,
  DELETE_ADVERT_PENDING,
  DELETE_ADVERT_FULFILLED,
  DELETE_ADVERT_REJECTED,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGOUT_FULFILLED,
  FETCH_USERNAME_PENDING,
  FETCH_USERNAME_FULFILLED,
  FETCH_USERNAME_REJECTED,
  TAGS_LOADED_PENDING,
  TAGS_LOADED_FULFILLED,
  TAGS_LOADED_REJECTED,
  UPDATE_FILTERS,
  CLEAR_FILTERS,
  UI_RESET_ERROR,
} from "./types";

export const defaultState = {
  auth: false,
  username: "",
  adverts: {
    data: [],
    loaded: false,
  },
  filters: {
    name: "",
    tags: [],
    sale: "all",
  },
  tags: {
    data: [],
    loaded: false,
  },
  ui: {
    pending: false,
    error: null,
  },
};

/* LOGIN & LOGOUT
--------------------------------------------------------------------- */
export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_FULFILLED:
      return true;
    case AUTH_LOGOUT_FULFILLED:
      return false;
    default:
      return state;
  }
}

/* USERNAME
--------------------------------------------------------------------- */
export function user(state = defaultState.username, action) {
  switch (action.type) {
    case FETCH_USERNAME_PENDING:
      return { ...state };
    case FETCH_USERNAME_FULFILLED:
      return {
        ...state,
        username: action.payload,
      };
    case FETCH_USERNAME_REJECTED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

/* ADVERTS
--------------------------------------------------------------------- */
export function adverts(state = defaultState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED_PENDING:
      return {
        ...state,
        loaded: false,
      };
    case ADVERTS_LOADED_FULFILLED:
      return {
        ...state,
        data: action.payload,
        loaded: true,
      };
    case ADVERTS_LOADED_REJECTED:
      return {
        ...state,
        error: action.payload,
      };
    case ADVERT_SINGLE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ADVERT_SINGLE_FULFILLED:
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
      };
    case ADVERT_SINGLE_REJECTED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CREATE_ADVERT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ADVERT_FULFILLED:
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
      };
    case CREATE_ADVERT_REJECTED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case DELETE_ADVERT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ADVERT_FULFILLED:
      return { ...state, data: state.data.filter((ad) => ad.id !== action.payload) };
    case DELETE_ADVERT_REJECTED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

/* TAGS
--------------------------------------------------------------------- */
export function tags(state = defaultState.tags, action) {
  switch (action.type) {
    case TAGS_LOADED_PENDING:
      return {
        ...state,
        loaded: false,
      };
    case TAGS_LOADED_FULFILLED:
      return {
        ...state,
        data: action.payload,
      };
    case TAGS_LOADED_REJECTED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

/* FILTERS
--------------------------------------------------------------------- */
export function filters(state = defaultState.filters, action) {
  switch (action.type) {
    case UPDATE_FILTERS:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_FILTERS:
      return defaultState.filters;
    default:
      return state;
  }
}

/* UI
--------------------------------------------------------------------- */
export function ui(state = defaultState.ui, action) {
  if (action.error) {
    return { ...state, pending: false, error: action.payload };
  }
  if (action.type === UI_RESET_ERROR) {
    return { ...state, error: null };
  }
  if (action.type.endsWith("/pending")) {
    return { ...state, pending: true };
  }
  if (action.type.endsWith("/fulfilled")) {
    return { ...state, pending: false, error: null };
  }
  return state;
}

const reducer = combineReducers({ auth, user, adverts, tags, filters, ui });

export default reducer;
