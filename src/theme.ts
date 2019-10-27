import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@global": {
      body: {
        backgroundColor: theme.palette.common.black,
      },
      a: {
        textDecoration: "none",
        color: "black",
      },
    },
    "root": {
      flexGrow: 1,
    },
    "paper": {
      padding: theme.spacing(2, 2, 5),
      margin: theme.spacing(1, 0, 1),
      background: "green",
      color: "white",
      border: "1px solid green",
      boxShadow: theme.shadows[5],

    },
    "nodemodalpaper": {
      position: "absolute",
      width: 600,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 4),
    },
    "submit": {
      margin: theme.spacing(3, 0, 2),
    },
    "clientButton": {
      margin: "3px",
    },
    "networkButton": {
      margin: "3px",
    },
    "list": {
      width: "100%",
      maxWidth: 360,
    },
    "menuButton": {
      "margin": theme.spacing(1),
      "background": "black",
      "color": "white",
      "&:hover": {
        backgroundColor: "white",
        textDecoration: "none",
        color: "black",
      },
    },
    "menuButton2": {
      "margin": theme.spacing(1),
      "background": "white",
      "color": "black",
      "&:hover": {
        backgroundColor: "green",
      },
    },
    "title": {
      flexGrow: 1,
    },
    "appbar": {
      background: "linear-gradient(45deg, #43a047 30%, #388e3c 90%)",
      color: "#fff",
    },
    "avatar": {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
    },
    "form": {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    "host": {
      "width": "150px",
      "margin-right": "10px",
    },
    "port": {
      "width": "100px",
      "margin-right": "10px",
    },
  }));

export default useStyles;
