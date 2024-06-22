import { authLoginFulfilled, authLogout } from "../actions";
import { auth, defaultState, adverts, filters, tags } from "../reducers";
import { ADVERTS_LOADED_FULFILLED, TAGS_LOADED_PENDING, TAGS_LOADED_REJECTED, UPDATE_FILTERS, CLEAR_FILTERS } from "../types";

describe("auth", () => {
  test('should manage "AUTH_LOGIN_FULFILLED" action', () => {
    const state = defaultState.auth;
    const action = authLoginFulfilled();
    expect(auth(state, action)).toBe(true);
  });

  test('should manage "AUTH_LOGOUT" action', () => {
    const state = defaultState.auth;
    const action = authLogout();
    expect(auth(state, action)).toBe(false);
  });

  test('should manage "ANY" action', () => {
    const state = defaultState.auth;
    const action = { type: "ANY" };
    expect(auth(state, action)).toBe(state);
  });

  test('should manage "ANY" action when state is not defined', () => {
    const state = undefined;
    const action = { type: "ANY" };
    expect(auth(state, action)).toBe(defaultState.auth);
  });
});

describe("adverts", () => {
  test('should handle "ADVERTS_LOADED_FULFILLED" action', () => {
    const state = defaultState.adverts;
    const action = { type: ADVERTS_LOADED_FULFILLED, payload: ["advert1", "advert2"] };
    expect(adverts(state, action)).toEqual({
      ...state,
      data: ["advert1", "advert2"],
      loaded: true,
    });
  });
});

describe("filters", () => {
  test('should handle the "UPDATE_FILTERS" action', () => {
    const state = defaultState.filters;
    const action = { type: UPDATE_FILTERS, payload: { name: "newName" } };
    expect(filters(state, action)).toEqual({
      ...state,
      name: "newName",
    });
  });
  test('should handle the "CLEAR_FILTERS" action', () => {
    const state = { name: "someName", tags: ["tag1"], sale: "yes" };
    const action = { type: CLEAR_FILTERS };
    expect(filters(state, action)).toEqual(defaultState.filters);
  });
});

describe("tags", () => {
  test('should handle "TAGS_LOADED_PENDING" action', () => {
    const state = defaultState.tags;
    const action = { type: TAGS_LOADED_PENDING };
    const expectedState = {
      ...state,
      loaded: false,
    };
    expect(tags(state, action)).toEqual(expectedState);
  });

  test('should handle "TAGS_LOADED_REJECTED" action', () => {
    const state = defaultState.tags;
    const error = "Network error";
    const action = { type: TAGS_LOADED_REJECTED, payload: error };
    const expectedState = {
      ...state,
      error: error,
    };
    expect(tags(state, action)).toEqual(expectedState);
  });
});
