import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createStore } from "redux";
import { vi } from "vitest";
import * as actions from "../../store/actions";
import rootReducer from "../../store/reducers";
import { LoginPage } from "../login/LoginPage";

vi.mock("../../store/actions", () => ({
  authLogin: vi.fn().mockReturnValue({ type: "AUTH_LOGIN" }),
  uiResetError: vi.fn().mockReturnValue({ type: "UI_RESET_ERROR" }),
}));

const initialState = {
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

const mockStore = createStore(rootReducer, initialState);

test("dispatches authLogin action on form submit", () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );

  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: "password" },
  });

  fireEvent.click(screen.getByText(/Log in/i));

  expect(actions.authLogin).toHaveBeenCalledWith({
    email: "test@example.com",
    password: "password",
    rememberMe: false,
  });
});
