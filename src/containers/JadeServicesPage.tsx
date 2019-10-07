import React, { useEffect, useState } from "react";
import { enAPIhttp } from "../api/EnApi";
import { useUsername } from "../stores/useCredsStore";
import { NavigationBar } from "../components/navigationComponent";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { useNode } from "../stores/useNodesStore";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

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
    button: {
      margin: theme.spacing(3, 0, 2),
      background: "green",
      color: "black",
      marginRight: theme.spacing(1),
    },
  }));

const JadeServicesPage: React.FC = () => {
  const [username] = useUsername();
  const [services, setServices] = useState<any[]>([]);
  const [runningServices, setRunningServices] = useState<any[]>([]);
  const [installedServices, setInstalledServices] = useState<any[]>([]);

  const classes = useStyles();

  const listServices = async () => {
    enAPIhttp.listServices("available").then((availableServicesResult) => {
      setServices(availableServicesResult);
      console.log(services);
    });

    enAPIhttp.listServices("running").then((runningServicesResult) => {
      setRunningServices(runningServicesResult);
      console.log(runningServices);
    });

    enAPIhttp.listServices("installed").then((installedServicesResult) => {
      setInstalledServices(installedServicesResult);
      console.log(installedServices);
    });
  };

  useEffect(() => {
    listServices();
  }, [services.length]);

  return (
    <div className={classes.root}>
      <NavigationBar title={"Home - Welcome to enUI " + username} />
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div>
              <Typography variant="h5">Services Available: {services.length}</Typography>
            </div>
            {
              services && services.map((service: { name: any }, index: any) => (
                <div id={index}>Name: {service.name}</div>
              ))
            }
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Services Running</Typography>
            <Typography>{runningServices.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Services Installed</Typography>
            <Typography>{installedServices.length}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Button
        className={classes.button}
      >
        <AddBoxIcon />
      </Button>
      <Button
        className={classes.button}
      >
        <DirectionsRunIcon />
      </Button>
    </div >
  );
};

export default JadeServicesPage;
