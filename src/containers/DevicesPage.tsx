import React from "react";
import { useUsername } from "../stores/useCredsStore";
import { NavigationBar } from "../components/navigationComponent";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
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

const DevicesPage: React.FC = () => {
  const [username] = useUsername();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavigationBar title={"Devices - Welcome to enUI " + username} />

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography>
              Device 1
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography>
              Device 2
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography>
              Device 3
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default DevicesPage;
