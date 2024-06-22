import { areAdvertsLoaded, areTagsLoaded, getAdvertByID } from "./selectors";
// import { getUserName } from "../api/client";
// import storage from "../utils/storage";

import {
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_FULFILLED,
  AUTH_LOGIN_REJECTED,
  // AUTH_LOGOUT_PENDING,
  // AUTH_LOGOUT_FULFILLED,
  // AUTH_LOGOUT_REJECTED,
  AUTH_LOGOUT,
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
  TAGS_LOADED_PENDING,
  TAGS_LOADED_FULFILLED,
  TAGS_LOADED_REJECTED,
  UPDATE_FILTERS,
  CLEAR_FILTERS,
  UI_RESET_ERROR,
} from "./types";

/* LOGIN
  --------------------------------------- */
export const authLoginPending = () => ({
  type: AUTH_LOGIN_PENDING,
});

export const authLoginFulfilled = () => ({
  type: AUTH_LOGIN_FULFILLED,
});

export const authLoginRejected = (error) => ({
  type: AUTH_LOGIN_REJECTED,
  payload: error,
  error: true,
});

export const authLogin = (credentials) => {
  return async function (dispatch, _getState, { services: { auth }, router }) {
    try {
      dispatch(authLoginPending());
      await auth.login(credentials);
      dispatch(authLoginFulfilled());
      const to = router.state.location.state?.from || "/";
      router.navigate(to, { replace: true });
    } catch (error) {
      dispatch(authLoginRejected(error));
    }
  };
};

/* LOGOUT
  --------------------------------------- */
export const authLogout = () => ({
  type: AUTH_LOGOUT,
});

// export const authLogoutPending = () => ({
//   type: AUTH_LOGOUT_PENDING,
// });

// export const authLogoutFulfilled = () => ({
//   type: AUTH_LOGOUT_FULFILLED,
// });

// export const authLogoutRejected = (error) => ({
//   type: AUTH_LOGOUT_REJECTED,
//   payload: error,
//   error: true,
// });

// export const authLogout = () => async (dispatch) => {
//   try {
//     dispatch(authLogoutPending());
//     await logout();
//     dispatch(authLogoutFulfilled());
//   } catch (error) {
//     dispatch(logoutRejected(error));
//   }
// };

// export const fetchUsername = () => async (dispatch) => {
//   dispatch({ type: FETCH_USERNAME_PENDING });

//   try {
//     const accessToken = storage.get("auth");
//     if (accessToken) {
//       const fetchedUsername = await getUserName(accessToken);
//       dispatch({ type: FETCH_USERNAME_FULFILLED, payload: fetchedUsername });
//     }
//   } catch (error) {
//     dispatch({ type: FETCH_USERNAME_REJECTED, payload: error.message });
//   }
// };

/* ADVERTS
  --------------------------------------- */
export const loadAdverts = () => {
  return async function (dispatch, getState, { services }) {
    if (!areAdvertsLoaded(getState())) {
      try {
        dispatch(advertsLoadedPending());
        const adverts = await services.adverts.getAdverts();
        dispatch(advertsLoadedFulfilled(adverts));
      } catch (error) {
        dispatch(advertsLoadedRejected(error));
      }
    }
  };
};

export const advertsLoadedPending = () => ({
  type: ADVERTS_LOADED_PENDING,
});

export const advertsLoadedFulfilled = (adverts) => ({
  type: ADVERTS_LOADED_FULFILLED,
  payload: adverts,
});

export const advertsLoadedRejected = (error) => ({
  type: ADVERTS_LOADED_REJECTED,
  payload: error,
});

/* SINGLE ADVERT
----------------------------------------- */
export const loadSingleAdvert =
  (id) =>
  async (dispatch, getState, { services }) => {
    const state = getState();
    if (!getAdvertByID(id)(state)) {
      try {
        dispatch(advertSinglePending());
        const advert = await services.adverts.getAdvert(id);
        dispatch(advertSingleFulfilled(advert));
      } catch (error) {
        dispatch(advertSingleRejected(error));
      }
    }
  };

export const advertSinglePending = () => ({
  type: ADVERT_SINGLE_PENDING,
});

export const advertSingleFulfilled = (adverts) => ({
  type: ADVERT_SINGLE_FULFILLED,
  payload: adverts,
});

export const advertSingleRejected = (error) => ({
  type: ADVERT_SINGLE_REJECTED,
  payload: error,
  error: true,
});

/* CREATE ADVERT 
----------------------------------------- */
export const createNewAdvert =
  (formValues) =>
  async (dispatch, _getState, { services, router }) => {
    try {
      dispatch(createAdvertPending());
      // console.log("Form content:", formValues);
      const response = await services.adverts.createAdvert(formValues);
      // console.log("Response from createAdvert:", response);
      dispatch(createAdvertFulfilled(response));

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const redirectTo = `/adverts/${response.id}`;
      router.navigate(redirectTo, { replace: true });
    } catch (error) {
      if (error) {
        dispatch(createAdvertRejected(error));
      }
    }
  };

export const createAdvertPending = () => ({
  type: CREATE_ADVERT_PENDING,
});

export const createAdvertFulfilled = (advert) => ({
  type: CREATE_ADVERT_FULFILLED,
  payload: advert,
});

export const createAdvertRejected = (error) => ({
  type: CREATE_ADVERT_REJECTED,
  payload: error,
  error: true,
});

/* DELETE ADVERT 
----------------------------------------- */
export const deleteSingleAdvert =
  (id) =>
  async (dispatch, _getState, { services, router }) => {
    try {
      dispatch(deleteAdvertPending());
      if (id) {
        await services.adverts.deleteAdvert(id);
        dispatch(deleteAdvertFulfilled(id));
        router.navigate("/adverts");
      }
    } catch (error) {
      if (error) {
        dispatch(deleteAdvertRejected(error));
      }
    }
  };

export const deleteAdvertPending = () => ({
  type: DELETE_ADVERT_PENDING,
});

export const deleteAdvertFulfilled = (id) => ({
  type: DELETE_ADVERT_FULFILLED,
  payload: id,
});

export const deleteAdvertRejected = (error) => ({
  type: DELETE_ADVERT_REJECTED,
  payload: error,
  error: true,
});

/* TAGS
  --------------------------------------- */
export const loadTags = () => {
  return async function (dispatch, getState, { services }) {
    if (!areTagsLoaded(getState())) {
      try {
        dispatch(tagsLoadedPending());
        const tags = await services.adverts.getAllTags();
        dispatch(tagsLoadedFulfilled(tags));
      } catch (error) {
        dispatch(tagsLoadedRejected(error));
      }
    }
  };
};

export const tagsLoadedPending = () => ({
  type: TAGS_LOADED_PENDING,
});

export const tagsLoadedFulfilled = (tags) => ({
  type: TAGS_LOADED_FULFILLED,
  payload: tags,
});

export const tagsLoadedRejected = (error) => ({
  type: TAGS_LOADED_REJECTED,
  payload: error,
});

/* FILTERS
  --------------------------------------- */
export const updateFilters = (filters) => ({
  type: UPDATE_FILTERS,
  payload: filters,
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS,
});

/* related to UI for ERROR DISPLAYING
------------------------------------------ */
export const uiResetError = () => ({
  type: UI_RESET_ERROR,
});
