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

export default function Meals() {
  const myContext = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    if (myContext.userUid && myContext.userName === "") {
      getUserInfo(myContext.userUid);
    } else if (myContext.userUid === "") {
      history.push("/signin");
    }
  }, [myContext.userUid]);

  let myPromise = new Promise((resolve, reject) => {
    let user = firebase.auth().currentUser;
    resolve(user);
  });

  const getUserInfo = async (uid) => {
    let response = await axios.post("https://foodfinder-server-8shjd.ondigitalocean.app/userinfo", { uid });
    let name = response.data[0];
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
        {myContext.meals.map((meal, index) => (
          <MealCard
            key={index}
            mealTitle={meal.recipe.label}
            mealImage={meal.recipe.image}
            mealCalories={meal.recipe.calories}
            mealTime={meal.recipe.totalTime}
            mealIngredients={meal.recipe.ingredientLines}
            mealNutrients={meal.recipe.totalNutrients}
            mealUrl={meal.recipe.url}
          />
        ))}
      </Masonry>
    </Container>
  );
}
