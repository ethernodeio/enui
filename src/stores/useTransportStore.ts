import { useState } from "react";
import { createStore } from "reusable";

export const useHostname = createStore(() => {
  // tslint:disable-next-line: react-hooks-nesting
  const [hostname, setHostname] = useState(localStorage.getItem("hostname"));
  // tslint:disable-next-line: no-shadowed-variable
  const handleSetHostname = (hostname: string) => {
    localStorage.setItem("hostname", hostname);
    return setHostname(hostname);
  };
  return [hostname, handleSetHostname];
});

export const usePort = createStore(() => {
  // tslint:disable-next-line: react-hooks-nesting
  const [port, setPort] = useState(localStorage.getItem("port"));
  // tslint:disable-next-line: no-shadowed-variable
  const handleSetPort = (port: string) => {
    localStorage.setItem("port", port);
    return setPort(port);
  };
  return [port, handleSetPort];
});
