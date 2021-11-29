import { useState } from 'react';

const useCounter = (defaultValue = 21) => {
  const [counter, setCounter] = useState(defaultValue);
  const increment = (factor = 1) => {
    setCounter(counter + 1);
  };

  const decrement = (factor = 1) => {
    setCounter(counter - 1);
  };

  const reset = () => {
    setCounter(defaultValue);
  };

  return { counter, increment, decrement, reset };
};

export default useCounter;
