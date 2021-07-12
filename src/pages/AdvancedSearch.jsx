import React, { useState, useEffect, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import {
  makeStyles,
  FormControlLabel,
  FormLabel,
  FormControl,
  AccordionSummary,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import RequiredSection from "../components/RequiredSection";
import Accordion from "@material-ui/core/Accordion";
import Exclusion from "../components/Exclusion";
import MealType from "../components/MealType";
import AppContext from "../components/AppContext";
import Calories from "../components/Calories";
import { max } from "date-fns/esm";
import { min } from "date-fns";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  btn: {
    marginTop: 20,
  },
});

export default function AdvancedSearch() {
  const classes = useStyles();
  const history = useHistory();
  const myContext = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");

  useEffect(() => {
    if (myContext.userUid && myContext.userName === "") {
      getUserInfo(myContext.userUid);
    } else if (myContext.userUid === "") {
      history.push("/signin");
    }
  }, [myContext.userUid]);

  const getUserInfo = async (uid) => {
    let response = await axios.post("http://localhost:5000/userinfo", { uid });
    let name = response.data[0];
    myContext.setUserName(name.first_name + " " + name.last_name);
    console.log(response);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "") {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (details === "") {
      setDetailsError(true);
    } else {
      setDetailsError(false);
    }

    if (title && details) {
      axios
        .post("http://localhost:5000/submitnote", {
          title,
          details,
          category,
        })
        .then((response) => {
          // console.log(response);
          history.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const getMeals = async (e) => {
    e.preventDefault();

    const query = myContext.query;
    const healthTemp = myContext.health;
    const exclude = myContext.exclude;
    const mealType = myContext.mealType;
    const minCal = myContext.minCal;
    const maxCal = myContext.maxCal;

    let health = "";
    let meal = "";

    let stringText = "";

    stringText = "&q=" + query;

    for (let i = 0; i < myContext.health.length; i++) {
      health = health + "&health=" + myContext.health[i];
    }

    stringText = stringText + health + "&excluded=" + exclude;

    for (let i = 0; i < myContext.mealType.length; i++) {
      meal = meal + "&mealType=" + myContext.mealType[i];
    }

    stringText = stringText + meal;

    if (minCal === "" && maxCal !== "") {
      stringText = stringText + "&calories=0-" + maxCal;
    } else if (minCal !== "" && maxCal === "") {
      stringText = stringText + "&calories=" + minCal;
    } else if (minCal !== "" && maxCal !== "") {
      stringText = stringText + "&calories=" + minCal + "-" + maxCal;
    }

    console.log(stringText);

    try {
      let response = await axios.post("http://localhost:5000/meals", {
        stringText,
      });
      myContext.setMeals(response.data.hits);
      history.push("/searchedmeals");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Typography
        className={classes.title}
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Search our meals, drinks, desserts, etc!
      </Typography>

      <form noValidate autoComplete="off" onSubmit={getMeals}>
        <Accordion>
          <RequiredSection />
        </Accordion>
        <Accordion>
          <Exclusion />
        </Accordion>
        <Accordion>
          <MealType />
        </Accordion>
        {/* <Accordion>
          <Calories />
        </Accordion> */}

        <Button
          className={classes.btn}
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Search
        </Button>
      </form>
    </div>
  );
}
