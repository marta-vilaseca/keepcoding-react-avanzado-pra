import { authLogin, authLoginFulfilled, authLoginPending, authLoginRejected } from "../actions";
import { loadTags, tagsLoadedPending, tagsLoadedFulfilled, tagsLoadedRejected } from "../actions";

//login
describe("authLogin", () => {
  const credentials = "credentials";
  const action = authLogin(credentials);
  const redirectUrl = "redirectUrl";
  const dispatch = vi.fn();
  const services = { auth: {} };
  const router = {
    state: { location: { state: { from: redirectUrl } } },
    navigate: vi.fn(),
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Login resolved follows the login flow", async () => {
    services.auth.login = vi.fn().mockResolvedValue();

    await action(dispatch, undefined, { services, router });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginPending());
    expect(services.auth.login).toHaveBeenCalledWith(credentials);
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFulfilled());
    expect(router.navigate).toHaveBeenCalledWith(redirectUrl, {
      replace: true,
    });
  });

  test("Login rejected follows the error flow", async () => {
    const error = new Error("unauthorized");
    services.auth.login = vi.fn().mockRejectedValue(error);

    await action(dispatch, undefined, { services, router });
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginPending());
    expect(services.auth.login).toHaveBeenCalledWith(credentials);
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginRejected(error));
    expect(router.navigate).not.toHaveBeenCalled();
  });
});

// tags
describe("loadTags", () => {
  const dispatch = vi.fn();
  const getState = vi.fn();

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("should dispatch correct actions on successful load", async () => {
    const mockTags = ["tag1", "tag2"];
    const services = {
      adverts: {
        getAllTags: vi.fn().mockResolvedValue(mockTags),
      },
    };
    const mockState = {
      tags: {
        data: [],
        loaded: false,
      },
    };
    getState.mockReturnValue(mockState);

    await loadTags()(dispatch, getState, { services });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, tagsLoadedPending());
    expect(dispatch).toHaveBeenNthCalledWith(2, tagsLoadedFulfilled(mockTags));
  });

  test("should dispatch correct actions on failed load", async () => {
    const error = new Error("Failed to load tags");
    const services = {
      adverts: {
        getAllTags: vi.fn().mockRejectedValue(error),
      },
    };
    const mockState = {
      tags: {
        data: [],
        loaded: false,
      },
    };
    getState.mockReturnValue(mockState);

    await loadTags()(dispatch, getState, { services });

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, tagsLoadedPending());
    expect(dispatch).toHaveBeenNthCalledWith(2, tagsLoadedRejected(error));
  });
});
