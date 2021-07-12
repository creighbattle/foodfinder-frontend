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

export default function RequiredSection() {
  const classes = useStyles();
  const myContext = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);

  //CheckBox
  // const [state, setState] = React.useState({
  //   checkedA: false,
  //   checkedB: false,
  //   checkedC: false,
  //   checkedD: false,
  //   checkedE: false,
  //   checkedF: false,
  // });

  const [healthState, setHealthState] = useState({
    alcohol: false,
    crustacean: false,
    gluten: false,
    pescatarian: false,
    vegetarian: false,
    vegan: false,
  });

  const data = [
    {
      label: "Alcohol-free",
      checked: healthState.alcohol,
      name: "alcohol-free",
    },

    {
      label: "Gluten-free",
      checked: healthState.gluten,
      name: "gluten-free",
    },
    {
      label: "Pescatarian",
      checked: healthState.pescatarian,
      name: "pescatarian",
    },
    {
      label: "Vegetarian",
      checked: healthState.vegetarian,
      name: "vegetarian",
    },
    {
      label: "Vegan",
      checked: healthState.vegan,
      name: "vegan",
    },
  ];

  //CheckBox
  // const handleChange = (event) => {
  //   if (event.target.checked === true) {
  //   } else {
  //   }

  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  // setHealthState({
  //   ...healthState,
  //   [event.target.name]: event.target.checked,
  // });

  const handleHealthChange = (event) => {
    if (event.target.checked === true) {
      if (event.target.name.includes("-")) {
        let val = event.target.name.split("-");
        setHealthState({
          ...healthState,
          [val[0]]: event.target.checked,
        });
      } else {
        setHealthState({
          ...healthState,
          [event.target.name]: event.target.checked,
        });
      }

      myContext.health.push(event.target.name);
      console.log(myContext.health);
    } else {
      if (event.target.name.includes("-")) {
        let val = event.target.name.split("-");
        setHealthState({
          ...healthState,
          [val[0]]: event.target.checked,
        });
      } else {
        setHealthState({
          ...healthState,
          [event.target.name]: event.target.checked,
        });
      }

      myContext.health.splice(myContext.health.indexOf(event.target.name), 1);
      console.log(myContext.health);
    }
  };

  const HealthBox = (props) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={props.checked}
            onChange={handleHealthChange}
            name={props.name}
          />
        }
        label={props.label}
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
            Query (required) | Only one is required
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            style={{ alignItems: "center" }}
            className="padding-bottom"
          >
            <Grid container item xs={4} sm={3} md={2}>
              <Typography>Search</Typography>
            </Grid>
            <Grid container item xs={8} sm={9} md={10}>
              <TextField
                onChange={(e) => myContext.setQuery(e.target.value)}
                className={classes.field}
                label="e.g. smoothie"
                placeholder="smoothie | chicken | pasta | etc"
                id="note"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                error={titleError}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
        <Container>
          <Typography
            style={{ textAlign: "center" }}
            className="padding-bottom"
          >
            Or
          </Typography>
        </Container>

        {/* CheckBox - Diet */}
        {/* <AccordionDetails>
          <Grid
            container
            style={{ alignItems: "center" }}
            className="padding-bottom"
          >
            <Grid container item xs={4} sm={3} md={2}>
              <Typography>Diet</Typography>
            </Grid>
            <Grid container item xs={8} sm={9} md={10}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                    />
                  }
                  label="Balanced"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedB}
                      onChange={handleChange}
                      name="checkedB"
                    />
                  }
                  label="High-fiber"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedC}
                      onChange={handleChange}
                      name="checkedC"
                    />
                  }
                  label="High-protein"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedD}
                      onChange={handleChange}
                      name="checkedD"
                    />
                  }
                  label="Low-carb"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedE}
                      onChange={handleChange}
                      name="checkedE"
                    />
                  }
                  label="Low-fat"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.checkedF}
                      onChange={handleChange}
                      name="checkedF"
                    />
                  }
                  label="Low-sodium"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </AccordionDetails>

        <Container>
          <Typography
            style={{ textAlign: "center" }}
            className="padding-bottom"
          >
            Or
          </Typography>
        </Container> */}

        {/* CheckBox - Health */}
        <AccordionDetails>
          <Grid container style={{ alignItems: "center" }}>
            <Grid container item xs={4} sm={3} md={2}>
              <Typography>Health</Typography>
            </Grid>
            <Grid container item xs={8} sm={9} md={10}>
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
