import React, { useState } from "react";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Ratings from "./components/Ratings";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Home} />
        <Route path="/sign-up" component={LogIn} />
        <Route path="/ratings" component={Ratings} />
      </div>
    </Router>
  );
}

export default App;
