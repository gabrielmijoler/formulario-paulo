import { useState } from "react";

const useToggle = (initialValue: boolean): [boolean, VoidFunction] => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => {
    setValue((previousValue) => !previousValue);
  };
  return [value, toggleValue];
};

export default useToggle;
