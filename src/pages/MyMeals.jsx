import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";
import MealCard from "../components/MealCard";
import AppContext from "../components/AppContext";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function MyMeals() {
  const myContext = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (myContext.userUid && myContext.userName === "") {
      getUserInfo(myContext.userUid);
    } else if (myContext.userUid === "") {
      history.push("/signin");
    }
  }, [myContext.userUid]);

  const getUserInfo = async (uid) => {
    let response = await axios.post("https://foodfinder-server-8shjd.ondigitalocean.app/userinfo", { uid });
    let response1 = await axios.post("https://foodfinder-server-8shjd.ondigitalocean.app/getmeals", { uid });
    let name = response.data[0];

    console.log(response1);
    console.log(response1.data);
    myContext.setMyMeals(response1.data);

    myContext.setUserName(name.first_name + " " + name.last_name);

    console.log(response);
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {myContext.myMeals.map((meal, index) => (
          <MealCard
            key={index}
            mealTitle={meal.mealtitle}
            mealImage={meal.mealimage}
            mealCalories={meal.mealcalories}
            // mealTime={meal.recipe.totalTime}
            mealIngredients={meal.mealingredients}
            mealNutrients={meal.mealnutrients}
            mealUrl={meal.mealurl}
          />
        ))}
      </Masonry>
    </Container>
  );
}
