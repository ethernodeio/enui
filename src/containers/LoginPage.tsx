import React, { useState, useEffect } from "react";
import { EnAPIhttp } from "../api/EnApi";
import { useUsername } from "../stores/useCredsStore";
import { useNode } from "../stores/useNodesStore";
import { useToken } from "../stores/useTokenStore";
import { usePort, useHostname } from "../stores/useTransportStore";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
    backgroundColor: theme.palette.secondary.main,
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

interface IProps {
  history: any;
}

const LoginPage: React.FC<IProps> = (props) => {
  const [username, setUsername] = useUsername();
  const [password, setPassword] = useState("");
  const [nodes, setNodes] = useNode();
  const [token, setToken] = useToken();
  // const [transport, setTransport] = useTransport();
  const [hostname, setHostname] = useHostname();
  const [port, setPort] = usePort();
  const [result, setResult] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setUsername("");
    setToken("");
    setNodes([]);
  }, []);

  async function login(event: any) {
    event.preventDefault();
    if (username.length < 3 || password.length < 3) {
      setError("Username or Password too short");
    } else {
      const authResult = await EnAPIhttp.login(username, password);
      if (authResult.status === "success") {
        setUsername(authResult.userName);
        setToken(authResult.token);
        setNodes(authResult.nodes);
        props.history.push("/");
      } else {
        setError(authResult.message);
      }
    }
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            name="password"
            label="Password"
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
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
            onClick={() => props.history.go("/nodes")}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            save
          </Button>
          <Button
            onClick={(event) => { login(event); }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          {error && <div>{error}</div>}
        </form>
      </div>
    </Container >
  );
};
export default LoginPage;
