import React, { useState, useEffect } from "react";
import NavBar from "./layout/NavBar.js";
import CheckYourAPPForm from "./layout/CheckYourAPP/CheckYourAPPForm.js";
import Home from "./layout/Home/Home.js";
import TestWebsites from "./layout/TestWebsites/TestWebsites.js";
import MyTests from "./layout/MyTests/MyTests.js";
import TestAnswers from "./layout/MyTests/TestAnswers.js";
import Encuesta from "./layout/Encuesta.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/auth/getUser")
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
      });
  }, []);

  
  //No exponer ids de usuarios o dejarlos quemados en el código
  return (
    <Router>
      <NavBar user={user}></NavBar>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/gettesting">
          <TestWebsites />
        </Route>
        <Route exact path="/createyourowntest">
          <CheckYourAPPForm user={user} />
        </Route>
        <Route exact path="/mytests">
          <MyTests user={user} />
        </Route>
        <Route exact path="/getTestAnswers">
          <TestAnswers test={{ _id: "5eb8d312382a666950f8d091" }} />
        </Route>
        <Route path="/survey/:id">
          <Encuesta />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
