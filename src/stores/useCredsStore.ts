import { useState } from "react";
import { createStore } from "reusable";

export const useUsername = createStore(() => {
  // tslint:disable-next-line: react-hooks-nesting
  const [username, setUsername] = useState(localStorage.getItem("username"));
  // tslint:disable-next-line: no-shadowed-variable
  const handleSetUsername = (username: string) => {
    localStorage.setItem("username", username);
    return setUsername(username);
  };
  return [username, handleSetUsername];
});
