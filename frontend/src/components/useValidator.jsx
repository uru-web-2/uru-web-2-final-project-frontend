import { useState } from 'react';

const regexRules = {
  text: /^[a-zA-Z\s]+$/, 
  number: /^[0-9]+$/, 
  alphanumeric: /^[a-zA-Z0-9\s]+$/, 
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

const useValidator = () => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value, rule) => {
    if (rule && regexRules[rule]) {
      if (!regexRules[rule].test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `Invalid ${rule} format`,
        }));
        return false;
      } else {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[name];
          return newErrors;
        });
        return true;
      }
    }
    return true;
  };

  const validateForm = (data, rules) => {
    let isValid = true;
    for (const field in data) {
      if (rules[field]) {
        const isFieldValid = validateField(field, data[field], rules[field]);
        if (!isFieldValid) {
          isValid = false;
        }
      }
    }
    return isValid;
  };

  return {
    errors,
    validateField,
    validateForm,
  };
};

export default useValidator;
