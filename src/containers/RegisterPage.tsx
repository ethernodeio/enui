import React, { useState } from "react";
import { EnAPIhttp } from "../api/EnApi";

interface IProps {
  history: any;
}

const RegisterPage: React.FC<IProps> = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [userRole, setUserRole] = useState("admin");
  const [result, setResult] = useState();
  const [error, setError] = useState();

  const createUser = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password === password2) {
      EnAPIhttp.createUser(username, password, userRole)
        .then((authResult: any) => {
          setResult(authResult);
          if (authResult.status === "success") {
            props.history.push("/login");
          } else {
            setError(authResult.message);
          }
        })
        .catch(setError);
    } else {
      setError("Passwords don't Match");
    }
  };
  return (
    <form onSubmit={createUser}>
      <label htmlFor="userName">Username</label>
      <input type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <label htmlFor="password2">Repeat Password</label>
      <input type="password"
        placeholder="Repeat Password"
        value={password2}
        onChange={(event) => setPassword2(event.target.value)}
      />
      <button type="submit">Register</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default RegisterPage;
