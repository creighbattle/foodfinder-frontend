import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { blue, green, purple, orange, red } from "@material-ui/core/colors";
import Layout from "./components/Layout";
import Meals from "./pages/Meals";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AppContext from "./components/AppContext";
import AdvancedSearch from "./pages/AdvancedSearch";
import firebase from "firebase/app";
import MyMeals from "./pages/MyMeals";

const { REACT_APP_API_KEY, REACT_APP_APP_ID } = process.env;
console.log(REACT_APP_API_KEY);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fefefe",
    },
    secondary: purple,
    third: green,
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: "foodpicker-22d64.firebaseapp.com",
  projectId: "foodpicker-22d64",
  storageBucket: "foodpicker-22d64.appspot.com",
  messagingSenderId: "1074268517688",
  appId: REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

function App() {
  const myContext = useContext(AppContext);

  const [meals, setMeals] = useState([]);
  const [myMeals, setMyMeals] = useState([]);
  const [mealType, setMealType] = useState([]);
  const [query, setQuery] = useState("");
  const [health, setHealth] = useState([]);
  const [exclude, setExclude] = useState("");
  const [minCal, setMinCal] = useState("");
  const [maxCal, setMaxCal] = useState("");
  const [userName, setUserName] = useState("");
  const [userUid, setUserUid] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUserUid(user.uid);
    } else {
      setUserUid("");
    }
  });

  let globalStates = {
    meals,
    myMeals,
    mealType,
    query,
    health,
    exclude,
    minCal,
    maxCal,
    userName,
    userUid,
    setMeals,
    setMyMeals,
    setMealType,
    setQuery,
    setHealth,
    setExclude,
    setMinCal,
    setMaxCal,
    setUserName,
    setUserUid,
  };

  return (
    <AppContext.Provider value={globalStates}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/searchedmeals">
                <Meals />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/search">
                <AdvancedSearch />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/">
                <MyMeals />
              </Route>
              {/* <Route path="/meals">
                <Meals />
              </Route> */}
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
