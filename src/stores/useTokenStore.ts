import { useState } from "react";
import { createStore } from "reusable";

export const useToken = createStore(() => {
  // tslint:disable-next-line: react-hooks-nesting
  const [token, setToken] = useState(localStorage.getItem("token"));
  // tslint:disable-next-line: no-shadowed-variable
  const handleSetToken = (token: string) => {
    localStorage.setItem("token", token);
    return setToken(token);
  };
  return [token, handleSetToken];
});
