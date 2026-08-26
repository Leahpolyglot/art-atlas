import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function Login({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation({
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleClose() {
    resetForm();
    setServerError("");
    onClose();
  }

  function handleSwitchToRegister() {
    resetForm();
    setServerError("");
    onSwitchToRegister();
  }

  function handleSubmit(event) {
    event.preventDefault();
    setServerError("");
    setIsSubmitting(true);

    onLogin(values)
      .then(() => {
        resetForm();
      })
      .catch((error) => setServerError(error.message))
      .finally(() => setIsSubmitting(false));
  }

  return (
    <AuthModal title="Sign in" isOpen={isOpen} onClose={handleClose}>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label className="auth-form__label">
          Email
          <input
            className="auth-form__input"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />
          <span className="auth-form__error">{errors.email}</span>
        </label>

        <label className="auth-form__label">
          Password
          <input
            className="auth-form__input"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
            minLength="6"
            placeholder="Your password"
          />
          <span className="auth-form__error">{errors.password}</span>
        </label>

        {serverError && <p className="auth-form__server-error">{serverError}</p>}

        <button className="auth-form__submit" type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        <p className="auth-form__switch">
          New to Art Atlas?{" "}
          <button className="auth-form__switch-button" type="button" onClick={handleSwitchToRegister}>
            Register
          </button>
        </p>
      </form>
    </AuthModal>
  );
}

export default Login;
