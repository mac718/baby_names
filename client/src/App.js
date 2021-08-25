import React, { useState } from "react";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Home} />
        <Route path="/sign-up" component={LogIn} />
      </div>
    </Router>
  );
}

export default App;
