import React, { useState } from "react";
import { useUsername } from "../stores/useCredsStore";
import { useNode } from "../stores/useNodesStore";
import { useToken } from "../stores/useTokenStore";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

interface IProps {
  addNode: any;
  getNodes: any;
  testNode: any;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function NewNodeModal(props: IProps) {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      paper: {
        position: "absolute",
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 4),
      },
      formMultiGeth: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: showMultiGeth,
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
      clientButton: {
        margin: "3px",
      },
      networkButton: {
        margin: "3px",
      },
    }),
  );

  // enUI hooks
  const [username, setUsername] = useUsername();
  const [nodeName, setNodeName] = useState();
  const [nodes, setNodes] = useNode();
  const [token, setToken] = useToken();
  const [result, setResult] = useState();
  const [error, setError] = useState();
  // Form HOoks
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [showMultiGeth, setMultiGeth] = useState("none");
  const [checkBox, setCheckBox] = useState({
    rpc: false,
    websocket: false,
  });
  const [radioValue, setRadioValue] = useState("classic");

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };
  const classes = useStyles();

  const handleCheckBox = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBox({ ...checkBox, [name]: event.target.checked });
    console.log("rpc " + checkBox.rpc);
    console.log("ws " + checkBox.websocket);
  };
  function handleRadioChange(event: React.ChangeEvent<unknown>) {
    setRadioValue((event.target as HTMLInputElement).value);
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleOpenModal}
      >
        Add Node
      </button>
      <Modal
        aria-labelledby="Add Node"
        aria-describedby="Spin up a Ethereum Node"
        open={open}
        onClose={handleCloseModal}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Spin up a Ethereum Node Client</h2>

          <Container fixed>
            <div style={{ borderBottom: "1px solid #000000" }}>
              <h3>Select Node Client</h3>
              <Button
                className={classes.clientButton}
                variant="contained"
                color="primary"
                onClick={() => setMultiGeth("")}
              >
                Multi-Geth
              </Button>
              <Button
                className={classes.clientButton}
                variant="contained"
                color="primary"
                disabled={true}
                onClick={() => setMultiGeth("")}
              >
                Parity
              </Button>
              <Button
                className={classes.clientButton}
                variant="contained"
                color="primary"
                disabled={true}
                onClick={() => setMultiGeth("")}
              >
                Classic Geth
              </Button>
              <Button
                className={classes.clientButton}
                variant="contained"
                color="primary"
                disabled={true}
                onClick={() => setMultiGeth("")}
              >
                Mantis
              </Button>
            </div>

            <form className={classes.formMultiGeth} noValidate>
              <h4>Multi-Geth Select Network</h4>
              <RadioGroup aria-label="position" name="position" value={radioValue} onChange={handleRadioChange} row>
                <FormControlLabel
                  value="classic"
                  control={<Radio color="primary" />}
                  label="ETC"
                  labelPlacement="top"
                />
                <FormControlLabel
                  value="kotti"
                  control={<Radio color="primary" />}
                  label="Kotti"
                  labelPlacement="top"
                />
              </RadioGroup>
              <h4>Enable JSON-RPC</h4>
              <FormControlLabel
                control={<Checkbox checked={checkBox.rpc} onChange={handleCheckBox("rpc")} value="false" />}
                label="Enable RPC http"
              />
              <FormControlLabel
                control={<Checkbox checked={checkBox.websocket} onChange={handleCheckBox("websocket")} value="false" />}
                label="Enable RPC WS"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                autoFocus
                name="nodename"
                id="nodename"
                label="Node Name"
                placeholder="Node Name"
                value={nodeName}
                onChange={(event) => setNodeName(event.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => { props.addNode(nodeName, radioValue, "fast", checkBox.rpc, checkBox.websocket); }}
              >
                Create Node
                </Button>
            </form>
            {error && <div>{error}</div>}
          </Container>
        </div>
      </Modal>
    </div >
  );
}
