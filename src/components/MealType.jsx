import React, { useState, useEffect, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import AppContext from "./AppContext";

// CheckBox Imports
import { green } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();
  const myContext = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [test, setTest] = useState([]);

  //CheckBox
  const [state, setState] = React.useState({
    Brakfast: false,
    Lunch: false,
    Dinner: false,
    Snack: false,
  });

  const data = [
    {
      label: "Breakfast",
      checked: state.Breakfast,
      name: "Breakfast",
    },

    {
      label: "Lunch",
      checked: state.Lunch,
      name: "Lunch",
    },
    {
      label: "Dinner",
      checked: state.Dinner,
      name: "Dinner",
    },
    {
      label: "Snack",
      checked: state.Snack,
      name: "Snack",
    },
  ];

  //CheckBox
  const handleChange = (event) => {
    if (event.target.checked === true) {
      console.log("yes");
      myContext.mealType.push(event.target.name);
    } else {
      myContext.mealType.splice(myContext.mealType.indexOf(event.target.name), 1);
    }

    console.log(myContext.mealType);

    let str = myContext.mealType.toString();
    console.log(str);

    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const HealthBox = (props) => {
    return (
      <FormControlLabel
        control={<Checkbox checked={props.checked} name={props.name} />}
        label={props.label}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Meal Type (Optional)
          </Typography>
        </AccordionSummary>

        {/* CheckBox - Health */}
        <AccordionDetails>
          <Grid container style={{ alignItems: "center" }}>
            <Grid container item>
              <FormGroup row>
                {data.map((item) => {
                  return (
                    <HealthBox
                      key={item.name}
                      checked={item.checked}
                      name={item.name}
                      label={item.label}
                    />
                  );
                })}
              </FormGroup>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
