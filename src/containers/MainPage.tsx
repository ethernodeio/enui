import React, { useEffect, useState } from "react";
import { enAPIhttp } from "../api/EnApi";
import { useUsername } from "../stores/useCredsStore";
import { useToken } from "../stores/useTokenStore";
import { NavigationBar } from "../components/navigationComponent";
import Grid from "@material-ui/core/Grid";
import { useNode } from "../stores/useNodesStore";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useStyles from "../theme";
import useInterval from "use-interval";
import Container from "@material-ui/core/Container";

const MainPage: React.FC = () => {
  const [username] = useUsername();
  const [nodes] = useNode();
  const [token] = useToken();
  const [sysInfo, setSysInfo] = useState();
  const classes = useStyles();

  const getSystemInfo = async () => {
    const getSysInfoResult = await enAPIhttp.getSysInfo(token);
    setSysInfo(getSysInfoResult);
    return getSysInfoResult;
  };

  useEffect(() => {
    enAPIhttp.getSysInfo(token).then((sysInfoResult) => {
      setSysInfo(sysInfoResult);
    });
  }, [token]);

  useInterval(() => {
    getSystemInfo();
  }, 5000);

  return (
    <div className={classes.root}>
      <NavigationBar title={"Home - Welcome to enUI " + username} />
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography>
                System Info
            </Typography>
              <hr />
              <Typography>
                {
                  sysInfo &&
                  <>
                    <div><b>Hostname:</b> {sysInfo.hostname}</div>
                    <div><b>CPU:</b> {sysInfo.cpu}</div>
                    <div><b>Ram:</b> {(sysInfo.freeram / 1000000000).toFixed(2)}Gb Free of {(sysInfo.ram / 1000000000).toFixed(2)}Gb</div>
                    <div><b>CPU Load avg:</b> {sysInfo.loadavg[0].toFixed(2)} | {sysInfo.loadavg[1].toFixed(2)} | {sysInfo.loadavg[2].toFixed(2)} </div>
                  </>
                }
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography>
                Running Nodes: {nodes.length}
              </Typography>
              <hr />
              <Typography>
                {
                  nodes && nodes.map((node: { nodeName: any; }, index: any) => (
                    <Typography>Name: {node.nodeName}</Typography>
                  ))
                }
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography>
                Twitter
            </Typography>
              <hr />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MainPage;
