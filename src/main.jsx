import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./_reset.css";
import { setAuthorizationHeader } from "./api/client";
import "./index.css";
import storage from "./utils/storage";

import configureStore from "./store";

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const router = createBrowserRouter([{ path: "*", element: <App /> }]);
const store = configureStore({ auth: !!accessToken }, { router });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {/* <BrowserRouter>
      <AuthContextProvider isDefaultLogged={!!accessToken}>
        <App />
      </AuthContextProvider>
    </BrowserRouter> */}
  </React.StrictMode>
);
