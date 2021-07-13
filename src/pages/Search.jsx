import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import Fastfood from "@material-ui/icons/FastfoodOutlined";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import axios from "axios";
import histroy, { useHistory } from "react-router-dom";
import AppContext from "../components/AppContext";

const useStyles = makeStyles({
  containerGrid: {
    paddingTop: "300px",
    paddingBottom: "300px",
  },
  gridItem: {
    textAlign: "center",
    margin: "10px",
  },
  textStyle: {
    alignItems: "center",
  },
});

function Search(props) {
  const classes = useStyles();
  const history = useHistory();
  const myContext = useContext(AppContext);

  async function sendRequest() {
    try {
      //let response = await axios.get("https://foodfindercb.herokuapp.com/meals");
      let response = await axios.get("https://foodfindercb.herokuapp.com/meals");
      console.log(response.data.hits);
      myContext.setMeals(response.data.hits);
      history.push("/");
    } catch (error) {
      alert(error);
    }

    // let response = await axios.get(
    //   `https://api.edamam.com/search?q=&from=1&to=2&app_id=${appId}&app_key=${appKey}&diet=balanced`
    // );
    // console.log(response);
  }

  return (
    <Grid container className={classes.containerGrid}>
      <Grid item xs={12} className={classes.gridItem}>
        <Button
          onClick={sendRequest}
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<Fastfood />}
        >
          Generate Random Meals
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.gridItem}>OR</Typography>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Button
          onClick={() => alert("hello")}
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<SearchOutlined />}
        >
          Advanced Search
        </Button>
      </Grid>
    </Grid>
  );
}

export default Search;
