import { useState } from 'react';

const useValidator = () => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value, rules = []) => {
    let error = '';

    for (const rule of rules) {
      if (rule.type === 'required' && !value.trim()) {
        error = rule.message || 'This field is required';
        break;
      }

      if (rule.type === 'regex' && rule.pattern && !rule.pattern.test(value)) {
        error = rule.message || 'Invalid format';
        break;
      }

      if (rule.type === 'maxLength' && value.length > rule.max) {
        error = rule.message || `Maximum ${rule.max} characters allowed`;
        break;
      }

      if (rule.type === 'minLength' && value.length < rule.min) {
        error = rule.message || `Minimum ${rule.min} characters required`;
        break;
      }

      if (rule.type === 'numberOnly' && isNaN(value)) {
        error = rule.message || 'Only numeric values are allowed';
        break;
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
    

    return !error;
  };

  const validateForm = (data, rulesMap) => {
    let isValid = true;
    for (const field in rulesMap) {
      const valid = validateField(field, data[field], rulesMap[field]);
      if (!valid) isValid = false;
    }
    return isValid;
  };

  const clearErrors = () => {
    setErrors({});
  };
  

  return { errors, validateField, validateForm, clearErrors };
};

export default useValidator;
