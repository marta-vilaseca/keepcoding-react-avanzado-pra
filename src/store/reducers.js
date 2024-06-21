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
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGOUT,
  FETCH_USERNAME_PENDING,
  FETCH_USERNAME_FULFILLED,
  FETCH_USERNAME_REJECTED,
  TAGS_LOADED_PENDING,
  TAGS_LOADED_FULFILLED,
  TAGS_LOADED_REJECTED,
  UPDATE_FILTERS,
  CLEAR_FILTERS,
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
  isLoading: false,
  error: null,
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_FULFILLED:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

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
    default:
      return state;
  }
}

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

const reducer = combineReducers({ auth, user, adverts, tags, filters });

export default reducer;
