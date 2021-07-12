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

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Exclude (Optional)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            style={{ alignItems: "center" }}
            className="padding-bottom"
          >
            {/* <Grid container item xs={4} sm={3} md={2}>
              <Typography>Exclude</Typography>
            </Grid> */}
            <Grid container item>
              <TextField
                onChange={(e) => myContext.setExclude(e.target.value)}
                className={classes.field}
                label="Exclude"
                placeholder="nuts | milk | yogurt | etc"
                id="note"
                variant="outlined"
                color="secondary"
                fullWidth
                error={titleError}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
