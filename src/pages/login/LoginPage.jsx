import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/common/Button.jsx";
import { Loader } from "../../components/common/Loader.jsx";
import { FormCheckbox } from "../../components/common/formElements/formCheckbox.jsx";
import { FormInputText } from "../../components/common/formElements/formInputText.jsx";
import Layout from "../../components/layout/Layout.jsx";
import { authLogin, uiResetError } from "../../store/actions";

import { getError, getPending } from "../../store/selectors";
import "./login.css";

export function LoginPage() {
  const dispatch = useDispatch();
  const resetError = () => dispatch(uiResetError());
  const error = useSelector(getError);
  const isLoading = useSelector(getPending);

  const [formValues, setFormValues] = useState({ email: "", password: "", rememberMe: false });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [name]: newValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(authLogin(formValues));
  };

  const { email, password, rememberMe } = formValues;
  const buttonDisabled = !email || !password || isLoading;
  return (
    <>
      {error && (
        <div className="error-message" onClick={resetError}>
          ERROR {error.status}: {error.message}
        </div>
      )}
      <Layout title="Log In" page="login">
        <form id="login-form" className="login__form" onSubmit={handleSubmit}>
          {isLoading && <Loader />}
          <p>
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <FormInputText className="form__inputfield" id="email" name="email" value={email} onChange={handleChange} required />
          </p>
          <p>
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <FormInputText className="form__inputfield" type="password" id="password" name="password" value={password} onChange={handleChange} required />
          </p>
          <p className="with__checkbox">
            <FormCheckbox labelText="Remember me" id="rememberMe" name="rememberMe" checked={rememberMe} onChange={handleChange} />
          </p>
          <Button className="form__button" type="submit" disabled={buttonDisabled}>
            Log in
          </Button>
        </form>
      </Layout>
    </>
  );
}
