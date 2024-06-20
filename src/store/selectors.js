export const getIsLogged = (state) => state.auth;

export const getUsername = (state) => state.user.username;
export const getUsernameError = (state) => state.user.error;

export const areAdvertsLoaded = (state) => state.adverts.loaded;
export const getAllAdverts = (state) => state.adverts.data;

export const areTagsLoaded = (state) => state.tags.loaded;
export const getAllTags = (state) => state.tags.data;

export const getFilters = (state) => state.filters;
