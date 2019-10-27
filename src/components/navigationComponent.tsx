import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/icon.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AccountBoxIcon from "@material-ui/icons/AccountBoxRounded";
import NodeIcon from "@material-ui/icons/StorageSharp";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import DevicesOtherIcon from "@material-ui/icons/DevicesOther";
// import MessageIcon from "@material-ui/icons/Message";
// import JadeIcon from "../assets/images/jade256x256.png";
import useStyles from "../theme";

interface IProps {
  title: any;
}

export function NavigationBar(props: IProps) {
  const classes = useStyles();

  return (
    <nav className={classes.root}>
      <AppBar position="static" className={classes.appbar} >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" arial-label="menu">
            <img src={logo} height="35" alt="" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.title}
          </Typography>
          <Link to="/main"><Button className={classes.menuButton}><AccountBoxIcon />Home</Button></Link>
          <Link to="/nodes"><Button className={classes.menuButton}><NodeIcon />Nodes</Button></Link>
          {/*<Link to="/jade"><Button className={classes.menuButton2}><img src={JadeIcon} height="24" alt="jade icon" /></Button></Link> */}
          {/* <Link to="/devices"><Button className={classes.menuButton2}><DevicesOtherIcon /> </Button></Link>
          <Link to="/chat"><Button className={classes.menuButton2}><MessageIcon /></Button></Link> */ }
          <Link to="/login"><Button className={classes.menuButton}><ExitToAppIcon />Logout</Button></Link>
        </Toolbar>
      </AppBar>
    </nav>
  );
}
