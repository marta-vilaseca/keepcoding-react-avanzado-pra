import { authLoginPending, advertsLoadedFulfilled, advertSingleRejected } from "../actions";
import { AUTH_LOGIN_PENDING, ADVERTS_LOADED_FULFILLED, ADVERT_SINGLE_REJECTED } from "../types";

// sync test
describe("authLoginPending", () => {
  test('should return an "AUTH_LOGIN_PENDING" action', () => {
    const expectedAction = {
      type: AUTH_LOGIN_PENDING,
    };
    const action = authLoginPending();
    expect(action).toEqual(expectedAction);
  });
});

// sync test
describe("advertsLoadedFulfilled", () => {
  test('should return an "ADVERTS_LOADED_FULFILLED" action', () => {
    const adverts = "adverts";
    const expectedAction = {
      type: ADVERTS_LOADED_FULFILLED,
      payload: adverts,
    };
    const action = advertsLoadedFulfilled(adverts);
    expect(action).toEqual(expectedAction);
  });
});

// sync test
describe("advertSingleRejected", () => {
  test('should return an "ADVERT_SINGLE_REJECTED" action', () => {
    const error = "ERROR";
    const expectedAction = {
      type: ADVERT_SINGLE_REJECTED,
      payload: "ERROR",
      error: true,
    };
    const action = advertSingleRejected(error);
    expect(action).toEqual(expectedAction);
  });
});
