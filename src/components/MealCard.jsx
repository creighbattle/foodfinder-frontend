import React, { useState, useContext, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {
  CardActionArea,
  CardActions,
  CardMedia,
  Button,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AppContext from "./AppContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  media: {
    height: 300,
  },
  test: {
    transition: "1s",
  },
  backCard: {
    transform: "rotateY(180deg)",
    // height: 300,
    overflowY: "auto",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function MealCard({
  mealImage,
  mealTitle,
  mealNutrients,
  mealIngredients,
  mealCalories,
  mealTime,
  mealUrl,
}) {
  const myContext = useContext(AppContext);
  const classes = useStyles();
  let location = useLocation();

  const [elevationSize, setElevationSize] = useState(5);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [ingredients, setIngredients] = useState(false);
  const [nutrients, setNutrients] = useState(false);
  const [card, setCard] = useState();
  const [height, setHeight] = useState(300);
  const [myMeals, setMyMeals] = useState("Delete Meal");


  useEffect(() => {
    if (location.pathname === '/searchedmeals') {
      setMyMeals("Save Meal")
    }
  }, [location.pathname])

  const changeElevationUp = () => {
    setElevationSize(10);
  };
  const changeElevationDown = () => {
    setElevationSize(5);
  };

  const rotateCardInstructions = (e) => {
    if (!cardFlipped) {
    } else {
      if (card.classList.contains("card-flipped")) {
        card.classList.remove("card-flipped");

        setTimeout(() => {
          setCardFlipped(false);
          setIngredients(false);
          setNutrients(false);
        }, 300);
      }
    }
  };

  const checkNutrients = (e) => {
    setTimeout(() => {
      setCardFlipped(true);
    }, 300);
    setNutrients(true);
    setHeight(
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.offsetHeight - 30
    );
    setCard(
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement
    );
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
      "card-flipped"
    );
  };

  const checkIngredients = (e) => {
    setTimeout(() => {
      setCardFlipped(true);
    }, 300);
    setIngredients(true);
    setHeight(
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.offsetHeight - 30
    );
    setCard(
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement
    );
    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add(
      "card-flipped"
    );
  };

  const saveMeal = async () => {

    if (myMeals === 'Save Meal') {
      let response = await axios.post("http://localhost:5000/savemeal", {
        id: myContext.userUid,
        mealImage,
        mealTitle,
        mealCalories,
        mealIngredients,
        mealNutrients,
        mealUrl,
      });

      let object = {
        id: myContext.userUid,
        mealimage: mealImage,
        mealtitle: mealTitle,
        mealcalories: mealCalories,
        mealIngredients: mealIngredients,
        mealNutrients: mealNutrients,
        mealurl: mealUrl,
      }

      myContext.setMyMeals(oldArr => [...oldArr, object])
  
      console.log(response);
    } else {
      axios
      .delete("http://localhost:5000/deletemeal", {data: {
        uid: myContext.userUid,
        mealTitle
      }
      })
      .then((res) => {
        console.log(res.data);
        const newMeals = myContext.myMeals.filter((meal) => meal.mealtitle != mealTitle);
        myContext.setMyMeals(newMeals);
      })
      .catch((e) => {
        console.log(e);
      });


    }


  };

  return (
    <div
      onMouseEnter={changeElevationUp}
      onMouseLeave={changeElevationDown}
      className={classes.test}
      id="divContainer"
    >
      <Card
        elevation={elevationSize}
        className={classes.test}
        onClick={(e) => rotateCardInstructions(e)}
      >
        {!cardFlipped && (
          <div>
            {/* <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <DeleteOutlined />
                </IconButton>
              }
              title={mealTitle}
            /> */}
            <CardActionArea
              className={classes.test}
              onClick={() => window.open(mealUrl)}
            >
              <CardMedia
                className={classes.media}
                image={mealImage}
                title={mealTitle}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {mealTitle}
                </Typography>
                <Typography>{Math.round(mealCalories)} Calories</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                onClick={(e) => checkIngredients(e)}
              >
                Ingredients
              </Button>
              <Button
                size="small"
                color="secondary"
                onClick={(e) => checkNutrients(e)}
              >
                Nutrients
              </Button>
              <Button
                size="small"
                color="secondary"
                onClick={(e) => saveMeal()}
              >
                {myMeals}
              </Button>
            </CardActions>
          </div>
        )}
        {cardFlipped && nutrients && (
          <CardContent className={classes.backCard} style={{ height }}>
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Label</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(mealNutrients).map((meal, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {mealNutrients[meal].label}
                      </TableCell>
                      <TableCell align="right">
                        {Math.round(mealNutrients[meal].quantity)}{" "}
                        {mealNutrients[meal].unit}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        )}
        {cardFlipped && ingredients && (
          <CardContent className={classes.backCard} style={{ height }}>
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Ingredients</TableCell>
                    {/* <TableCell align="right">Ingredients</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mealIngredients.map((meal, i) => (
                    <TableRow key={i}>
                      {/* <TableCell component="th" scope="row">
                        {i}
                      </TableCell> */}
                      <TableCell>{meal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

export default MealCard;
