import React, { useEffect } from "react";
import { enAPIwebSocket } from "../api/EnApi";
import { useUsername } from "../stores/useCredsStore";
import { NavigationBar } from "../components/navigationComponent";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useNode } from "../stores/useNodesStore";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
  }));

const MainPage: React.FC = () => {
  const [username] = useUsername();
  const nodes = useNode();
  const classes = useStyles();

  useEffect(() => {
    enAPIwebSocket.onNotification((data) => console.log(data));
  }, []);

  return (
    <div className={classes.root}>
      <NavigationBar title={"Home - Welcome to enUI " + username} />

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography>
              Running Nodes
            </Typography>
            <Typography>{nodes.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography>
              Running IoT Devices
            </Typography>
            <Typography>{nodes.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography>
              Latest Updates
            </Typography>
            <Typography>We Has Nodes</Typography>
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
};

export default MainPage;
