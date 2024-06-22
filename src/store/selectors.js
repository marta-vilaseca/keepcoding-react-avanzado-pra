export const getIsLogged = (state) => state.auth;

export const getUsername = (state) => state.user.username;
export const getUsernameError = (state) => state.user.error;

export const getError = (state) => state.ui.error;
export const getPending = (state) => state.ui.pending;

export const areAdvertsLoaded = (state) => state.adverts.loaded;
export const getAllAdverts = (state) => state.adverts.data;

export const getAdvertByID = (id) => (state) => getAllAdverts(state).find((advert) => advert.id === id);

export const areTagsLoaded = (state) => state.tags.loaded;
export const getAllTags = (state) => state.tags.data;

export const getFilters = (state) => state.filters;
