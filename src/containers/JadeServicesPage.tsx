import React, { useEffect, useState } from "react";
import { enAPIhttp } from "../api/EnApi";
import { useUsername } from "../stores/useCredsStore";
import { NavigationBar } from "../components/navigationComponent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import StorageIcon from "@material-ui/icons/Storage";
import useStyles from "../theme";

const JadeServicesPage: React.FC = () => {
  const [username] = useUsername();
  const [services, setServices] = useState<any[]>([]);
  const [runningServices, setRunningServices] = useState<any[]>([]);
  const [installedServices, setInstalledServices] = useState<any[]>([]);
  const classes = useStyles();

  const listServices = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services.length, runningServices.length, installedServices.length]);
  return (
    <div className={classes.root}>
      <NavigationBar title={"Jade Services - " + username + " these are your running JADE services"} />
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <div>
              <Typography variant="h5">Services Available: {services.length}</Typography>
            </div>
            <List className={classes.list}>
              {
                services && services.map((service: { name: any, version: any }, index: any) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <AddBoxIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={service.name} secondary={service.version} />
                  </ListItem>
                ))
              }
            </List>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Services Running: {runningServices.length}</Typography>
            <List className={classes.list}>
              {
                runningServices && runningServices.map((serviceRunning: { name: any, version: any, state: any }, index: any) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <StorageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={serviceRunning.name} secondary={serviceRunning.version} />
                  </ListItem>
                ))
              }
            </List>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h5">Services Installed: {installedServices.length}</Typography>
            <List className={classes.list}>
              {
                installedServices && installedServices.map((installedService: { name: any, version: any, state: any }, index: any) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <DirectionsRunIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={installedService.name} secondary={installedService.version} />
                  </ListItem>
                ))
              }
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Button
        className={classes.menuButton}
      >
        <AddBoxIcon />
      </Button>
      <Button
        className={classes.menuButton}
      >
        <DirectionsRunIcon />
      </Button>
    </div >
  );
};

export default JadeServicesPage;
