import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useNode } from "../stores/useNodesStore";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3, 2),
      margin: theme.spacing(1, 3),
    },
  }),
);

interface IProps {
  removeNodes: any;
}

function NodeList(props: IProps) {
  const [nodes] = useNode();
  const classes = useStyles();

  return (
    nodes.map((node: { nodeId: any; nodeName: any; nodeNetwork: any, version: any, sync: any, clientversion: any }, index: any) => (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper} key={index} id={index}>
              Node Name: {node.nodeName}<br />
              Node Container ID: {node.nodeId} <br />
              Node Network: {node.nodeNetwork}<br />
              Net version : {node.version}<br />
              Client Version: {node.clientversion}<br />
              Syncing: {node.sync && node.sync !== "false" ? <>CurrentBlock: {node.sync.currentBlock}</> : node.sync}<br />
              <Button variant="contained" onClick={() => props.removeNodes(node.nodeId, node.nodeName, true)}>Remove Node</Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )));
}

export default NodeList;
