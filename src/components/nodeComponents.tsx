import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useNode } from "../stores/useNodesStore";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

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

  function parseString(hex: any) {
    console.log(parseInt(hex, 16));
    return parseInt(hex, 16);
  }

  return (
    nodes.map((node: { nodeId: any; nodeName: any; nodeNetwork: any, version: any, sync: any, clientversion: any, blockNumber: any }, index: any) => (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper} key={index} id={index}>
              <Typography variant="h5" component="h3">
                {node.nodeName}
              </Typography><br />
              Container ID: {node.nodeId} <br />
              Node Network: {node.nodeNetwork}<br />
              Net version : {node.version}<br />
              Client Version: {node.clientversion}<br />
              {
                node.sync && node.sync !== "false" ?
                  <>Syncing:
                <br />
                    Highest Block: {parseString(node.sync.highestBlock)}<br />
                    Current Block: {parseString(node.sync.currentBlock)}<br />
                    Known States: {parseString(node.sync.knownStates)}<br />
                    Pulled States: {parseString(node.sync.pulledStates)}
                  </> : <>Current Block: {parseString(node.blockNumber)}</>
              }<br />
              <Button variant="contained" onClick={() => props.removeNodes(node.nodeId, node.nodeName, true)}>Remove Node</Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )));
}

export default NodeList;
