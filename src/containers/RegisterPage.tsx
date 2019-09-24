import React, { useState } from "react";
import { enAPIhttp } from "../api/EnApi";
import { usePort, useHostname } from "../stores/useTransportStore";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

interface IProps {
  history: any;
  to: any;
  location: any;
}
const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  "paper": {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  "avatar": {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  "form": {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  "submit": {
    margin: theme.spacing(3, 0, 2),
  },
  "host": {
    "width": "150px",
    "margin-right": "10px",
  },
  "port": {
    "width": "100px",
    "margin-right": "10px",
  },
}));

const RegisterPage: React.FC<IProps> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [userRole] = useState("admin");
  const [result, setResult] = useState();
  const [error, setError] = useState();
  const [hostname, setHostname] = useHostname();
  const [port, setPort] = usePort();

  const createUser = async (event: React.FormEvent) => {
    event.preventDefault();
    if (username === "") { return setError("Blank user name"); }
    if (password === password2 && password !== "") {
      enAPIhttp.createUser(username, password, userRole)
        .then((authResult: any) => {
          setResult(authResult);
          if (authResult.status === "success") {
            props.history.push("/login");
          } else {
            setError(result.message);
          }
        })
        .catch(() => setError);
    } else {
      return setError("Passwords don't Match");
    }
  };

  const NavLink = () => {
    props.history.go(0);
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VerifiedUser />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome to enUI User creation.
      </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Username"
            label="Username"
            name="Username"
            autoFocus
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            name="password"
            id="password"
            label="Password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="password"
            name="password2"
            id="password2"
            label="Repeat Password"
            placeholder="Repeat Password"
            value={password2}
            onChange={(event) => setPassword2(event.target.value)}
          />
          Setup enApi host location<br />
          <TextField
            variant="outlined"
            margin="normal"
            className={classes.host}
            required
            id="hostname"
            name="hostname"
            label="Host Name"
            placeholder="Enter enApi Address"
            value={hostname}
            onChange={(event) => setHostname(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            className={classes.port}
            required
            id="port"
            name="port"
            label="port"
            placeholder="port"
            value={port}
            onChange={(event) => setPort(event.target.value)}
          />
          <Button
            onClick={() => NavLink()}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            save
          </Button>
          <Button
            onClick={(event) => { createUser(event); }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          *Note: This form is only for first time users.<br />
          Please go to the <Link to="/login" replace>Login</Link> page if you already have an account. <br />
          Or contact your admin for a new one.<br />
          {error && <div>{error}</div>}
        </form>
      </div>
    </Container >
  );
};

export default RegisterPage;
