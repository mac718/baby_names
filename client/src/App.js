import React, { useState } from "react";
import LogIn from "./components/LogIn";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Ratings from "./components/Ratings";
import BabyNameCard from "./components/BabyNameCard";
import NavBar from "./components/NavBar";
import { withAuth } from "./components/withAuth";
import SignUp from "./components/SignUp";
import AccountDetails from "./components/AccountDetails";
import RatingOverlay from "./components/RatingOverlay";

function App() {
  return (
    <div className="container">
      <Router>
        <NavBar />
        <Route path="/" exact component={withAuth(BabyNameCard)} />
        <Route path="/" exact component={withAuth(RatingOverlay)} />
        <Route path="/login" render={(props) => <LogIn {...props} />} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/ratings" component={withAuth(Ratings)} />
        <Route path="/account" component={withAuth(AccountDetails)} />
      </Router>
    </div>
  );
}

export default App;
