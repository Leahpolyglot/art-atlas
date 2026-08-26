import { useState } from "react";
import AuthModal from "../AuthModal/AuthModal";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function Register({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation({
    name: "",
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

  function handleSwitchToLogin() {
    resetForm();
    setServerError("");
    onSwitchToLogin();
  }

  function handleSubmit(event) {
    event.preventDefault();
    setServerError("");
    setIsSubmitting(true);

    onRegister(values)
      .then(() => {
        resetForm();
      })
      .catch((error) => setServerError(error.message))
      .finally(() => setIsSubmitting(false));
  }

  return (
    <AuthModal title="Register" isOpen={isOpen} onClose={handleClose}>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label className="auth-form__label">
          Name
          <input
            className="auth-form__input"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
            minLength="2"
            maxLength="30"
            placeholder="Your name"
          />
          <span className="auth-form__error">{errors.name}</span>
        </label>

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
            placeholder="At least 6 characters"
          />
          <span className="auth-form__error">{errors.password}</span>
        </label>

        {serverError && <p className="auth-form__server-error">{serverError}</p>}

        <button className="auth-form__submit" type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>

        <p className="auth-form__switch">
          Already registered?{" "}
          <button className="auth-form__switch-button" type="button" onClick={handleSwitchToLogin}>
            Sign in
          </button>
        </p>
      </form>
    </AuthModal>
  );
}

export default Register;
