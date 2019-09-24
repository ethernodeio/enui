import React from "react";
import { Link } from "react-router-dom";
import { useNode } from "../stores/useNodesStore";
import { usePort, useHostname } from "../stores/useTransportStore";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import hextToString from "../helpers/hexToString";
import hexToNumber from "../helpers/hexToNumber";
import hexToDate from "../helpers/hexToDate";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2, 2, 5),
      margin: theme.spacing(1, 0, 1),
      background: "green",
      color: "white",
      border: "1px solid green",
      boxShadow: theme.shadows[5],
    },
    menuButton: {
      margin: theme.spacing(1, 1, 1),
      background: "black",
      color: "white",
    },
  }),
);

interface IProps {
  removeNodes: any;
}

function NodeList(props: IProps) {

  const [nodes] = useNode();
  const classes = useStyles();
  const [hostName, setHostName] = useHostname();

  function openLink(rpcPort: any) {
    window.open("http://" + hostName + ":8422/?rpcUrl=http://" + hostName + ":" + rpcPort);
  }

  return (
    <Grid container spacing={1}>
      {
        nodes.map((node: { nodeId: any; nodeName: any; nodeNetwork: any, version: any, chainid: any, sync: any, clientversion: any, blockNumber: any, peers: any, rpcPort: any, wsPort: any, blockinfo: any }, index: any) => (
          <Grid item xs={3}>
            <Paper className={classes.paper} key={index} id={index}>
              <Typography variant="h5">{node.nodeName}</Typography>
              <Typography> Node Network: {node.nodeNetwork}</Typography>
              <Typography>Net version : {node.version}</Typography>
              <Typography>Chain Id: {hexToNumber(node.chainid)}</Typography>
              <Typography>Peers : {hexToNumber(node.peers)}</Typography>
              <Typography> Node IP: {hostName}</Typography>
              <Typography> RPC Port: {node.rpcPort}</Typography>
              <Typography>WS Port: {node.wsPort}</Typography>
              {
                node.sync && node.sync !== "false" ?
                  <Paper className={classes.paper} >
                    <Typography>Node Syncing:</Typography>
                    <Typography> Highest Block: {hexToNumber(node.sync.highestBlock)}</Typography>
                    <Typography>Current Block: {hexToNumber(node.sync.currentBlock)}</Typography>
                    <Typography>Known States: {hexToNumber(node.sync.knownStates)}</Typography>
                    <Typography> Pulled States: {hexToNumber(node.sync.pulledStates)}</Typography>
                  </Paper> :
                  <Paper className={classes.paper} >
                    <Typography>Block: {hexToNumber(node.blockNumber)}</Typography>
                    {
                      node.blockinfo &&
                      <div>
                        <Typography>Time Mined: {hexToDate(node.blockinfo.timestamp)}</Typography>
                        <Typography>Difficulty: {hexToNumber(node.blockinfo.difficulty)}</Typography>
                        <Typography>Total Difficulty: {hexToNumber(node.blockinfo.totalDifficulty)}</Typography>
                        <Typography>Gas Used: {hexToNumber(node.blockinfo.gasUsed)}</Typography>
                        <Typography>Miner Name: {hextToString(node.blockinfo.extraData)}</Typography>
                        <Typography>Miner Address: {node.blockinfo.miner}</Typography>
                      </div>
                    }
                  </Paper>
              }
              <Button onClick={() => openLink(node.rpcPort)} className={classes.menuButton}>View on Jade Explorer</Button>
              <Button className={classes.menuButton} onClick={() => props.removeNodes(node.nodeId, node.nodeName, false)}>Remove Node</Button>
              <Typography><small>{node.clientversion}</small></Typography>
            </Paper>
          </Grid>
        ))
      }
    </Grid >
  );
}
export default NodeList;
