import React, { useState } from "react";
import LogIn from "./components/LogIn";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Ratings from "./components/Ratings";
import BabyNameCard from "./components/BabyNameCard";
import NavBar from "./components/NavBar";
import { withAuth } from "./components/withAuth";

function App() {
  return (
    <div className="container">
      <NavBar />
      <Router>
        <Route path="/" exact component={withAuth(BabyNameCard)} />
        <Route path="/sign-up" component={LogIn} />
        <Route path="/ratings" component={withAuth(Ratings)} />
      </Router>
    </div>
  );
}

export default App;
