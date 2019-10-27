import React, { useState } from "react";
import { useUsername } from "../stores/useCredsStore";
import { NavigationBar } from "../components/navigationComponent";
import { enAPIhttp } from "../api/EnApi";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MessageIcon from "@material-ui/icons/Message";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const ChatPage: React.FC = () => {
  const [username] = useUsername();
  const [symKeyPass, setSymkeyPass] = useState("");
  const [symKey, setSymKey] = useState();
  const [symKeyId, setSymKeyId] = useState();
  const [keyPair, setKeyPair] = useState();
  const [error] = useState();
  const [showChat, setShowChat] = useState("none");
  const [newMsg, setNewMsg] = useState();

  const useStyles = makeStyles((theme) => ({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    "root": {
      flexGrow: 1,
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
    "form": {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    "formChatRoom": {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(2),
      display: showChat,
    },
  }));

  async function sendMessage() {
    const newMessage = await enAPIhttp.ethRpcCall(username, "kotti", "kotti", "shh_post", [{
      symKeyID: symKeyId,
      sig: keyPair,
      ttl: 120,
      topic: "0x07678231",
      payload: "0x68656c6c6f",
      powTarget: 3.01,
      powTime: 3,
    }], 62);
    console.log(newMessage);
  }

  async function getKeys() {
    // enAPIwebSocket.onNotification((data) => { console.log(data); });
    const newSymKeyResult = await enAPIhttp.ethRpcCall(username, "kotti", "kotti", "shh_generateSymKeyFromPassword", [symKeyPass], 88);
    setSymKey([symKey, newSymKeyResult.result]);
    console.log(newSymKeyResult.result);
    const setNewSymKey = await enAPIhttp.ethRpcCall(username, "kotti", "kotti", "shh_addSymKey", ["0x" + newSymKeyResult.result], 89);
    setSymKeyId(setNewSymKey.result);
    console.log(setNewSymKey.result);
    const newKeyPairResult = await enAPIhttp.ethRpcCall(username, "kotti", "kotti", "shh_newKeyPair", [], 90);
    setKeyPair(newKeyPairResult.result);
    console.log(newKeyPairResult.result);
  }

  const classes = useStyles();
  return (
    <div className={classes.root} >
      <NavigationBar title={"Chat - Welcome to enUI " + username} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <MessageIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            enChat
      </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="symKeyPass"
              name="symKeyPass"
              label="Chatroom Name"
              autoFocus
              placeholder="Chatroom Name"
              value={symKeyPass}
              onChange={(event) => setSymkeyPass(event.target.value)}
            />
            <Button
              onClick={() => { getKeys(); setShowChat(""); }}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Enter
          </Button>
            {error && <div>{error}</div>}
          </form>
          <form className={classes.formChatRoom}>
            <TextareaAutosize
              aria-label="minimum height"
              rows={10}
              placeholder="Chat"
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="newMsg"
              name="newMsg"
              label="Message"
              autoFocus
              placeholder={"Message@ " + symKeyPass}
              value={newMsg}
              onChange={(event) => setNewMsg(event.target.value)}
            />
            <Button
              onClick={() => sendMessage()}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send
          </Button>
          </form>
        </div>
      </Container >
    </div>
  );
};

export default ChatPage;
