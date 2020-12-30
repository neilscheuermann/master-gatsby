import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // Check if the value is a number
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }

    setValues({
      // copy the existing values
      ...values,
      // update the one that changed
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
