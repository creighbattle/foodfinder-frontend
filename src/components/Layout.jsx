import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SubjectOutlined from "@material-ui/icons/SubjectOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import LockOutlined from "@material-ui/icons/LockOutlined";
import LockOpenOutlined from "@material-ui/icons/LockOpenOutlined";
import { useHistory, useLocation } from "react-router";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { format } from "date-fns";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Drawer from "@material-ui/core/Drawer";

import AppContext from "./AppContext";
import firebase from "firebase/app";
import "firebase/auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
    },
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
  };
});

export default function Layout({ children }) {
  const myContext = useContext(AppContext);
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [isOpen, setIsOpen] = useState(true);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [fLetter, setFletter] = useState("");
  const [lLetter, setLletter] = useState("");
  const [icon, setIcon] = useState(<LockOpenOutlined color="secondary" />);
  const [text, setText] = useState("Sign In");

  useEffect(() => {
    setNames();
  }, [myContext.userName]);

  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const menuItems = [
    {
      text: "My Meals",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Search Meals",
      icon: <SearchOutlined color="secondary" />,
      path: "/search",
    },
    {
      text,
      icon,
      path: "/signin",
    },
    // {
    //   text: "Get Meals",
    //   icon: <SearchOutlined color="secondary" />,
    //   path: "/mymeals",
    // },
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const onBtnClick = async (itemPath) => {
    if (itemPath.path === "/signin") {
      let result = firebase.auth().signOut();
      myContext.setUserName("");
      myContext.setMyMeals([]);
      myContext.setUserUid("");
      setIcon(<LockOpenOutlined color="secondary" />);
      setText("Sign In");
      console.log(result);
      history.push(itemPath.path);
    } else {
      console.log(itemPath.path);
      history.push(itemPath.path);
    }
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => onBtnClick(item.path)}
            className={location.pathname == item.path ? classes.active : null}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const setNames = () => {
    if (myContext.userName) {
      let name = myContext.userName.split(" ");
      setFname(name[0]);
      setLname(name[1]);
      setFletter(name[0][0]);
      setLletter(name[1][0]);

      setIcon(<LockOutlined color="secondary" />);
      setText("Sign Out");
    }
  };

  return (
    <div className={classes.root}>
      {/* app bar */}

      {matches && (
        <AppBar className={classes.appbar}>
          <Toolbar>
            <Typography className={classes.date}>
              Today is the {format(new Date(), "do MMMM Y")}
            </Typography>
            {myContext.userName && (
              <>
                <Typography>{fname}</Typography>
                <Avatar className={classes.avatar}>
                  {fLetter}
                  {lLetter}
                </Avatar>
              </>
            )}
          </Toolbar>
        </AppBar>
      )}
      {!matches && (
        <AppBar>
          <Toolbar>
            <Typography className={classes.date}>
              Today is the {format(new Date(), "do MMMM Y")}
            </Typography>
            {myContext.userName && (
              <>
                <Typography>{fname}</Typography>
                <Avatar className={classes.avatar}>
                  {fLetter}
                  {lLetter}
                </Avatar>
              </>
            )}
          </Toolbar>
        </AppBar>
      )}

      {/* side drawer */}
      {matches && (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
        >
          <div>
            <Typography variant="h5" className={classes.title}>
              {myContext.userName || <div>Food Finder</div>}
            </Typography>
          </div>

          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                button
                onClick={() => onBtnClick(item)}
                className={
                  location.pathname == item.path ? classes.active : null
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      {!matches && (
        <div>
          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                {list(anchor)}
              </SwipeableDrawer>
            </React.Fragment>
          ))}
        </div>
      )}

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>

    // <div>
    //   {["bottom"].map((anchor) => (
    //     <React.Fragment key={anchor}>
    //       <SwipeableDrawer
    //         anchor={anchor}
    //         open={state[anchor]}
    //         onClose={toggleDrawer(anchor, false)}
    //         onOpen={toggleDrawer(anchor, true)}
    //       >
    //         {list(anchor)}
    //       </SwipeableDrawer>
    //     </React.Fragment>
    //   ))}
    // </div>
  );
}
