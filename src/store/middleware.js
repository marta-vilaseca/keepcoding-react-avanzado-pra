export const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("dispatching", action, store.getState());
  const result = next(action);
  console.log("final state", store.getState());
  console.groupEnd();
  return result;
};

export const timestamp = (store) => (next) => (action) => {
  const newAction = {
    ...action,
    meta: {
      ...action.meta,
      timestamp: new Date(),
    },
  };
  return next(newAction);
};

export function failureRedirects(router, redirectsMap) {
  return function (store) {
    return function (next) {
      return function (action) {
        const result = next(action);

        if (!action.error) {
          return result;
        }

        const redirect = redirectsMap[action.payload.status];
        if (redirect) {
          router.navigate(redirect);
        }

        return result;
      };
    };
  };
}
