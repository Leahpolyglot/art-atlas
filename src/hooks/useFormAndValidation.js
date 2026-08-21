import { useState } from "react";

export default function useFormAndValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(event) {
    const { name, value, validationMessage } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: validationMessage }));
    setIsValid(event.target.closest("form")?.checkValidity() ?? false);
  }

  function resetForm(nextValues = initialValues) {
    setValues(nextValues);
    setErrors({});
    setIsValid(false);
  }

  return { values, errors, isValid, handleChange, resetForm };
}
