import React, { useState, useEffect } from "react";
import LogIn from "./components/LogIn";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Ratings from "./components/Ratings";
import BabyNameCard from "./components/BabyNameCard";
import NavBar from "./components/NavBar";
import { withAuth } from "./components/withAuth";
import SignUp from "./components/SignUp";
import AccountDetails from "./components/AccountDetails";
import LinkEmailForm from "./components/LinkEmailForm";
import LinkedUsers from "./components/LinkedUsers";
import LinkedAccountRatings from "./components/LinkedAccountRatings";
import LandingPage from "./components/LandingPage";

export const userContext = React.createContext();

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/users/getUser", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setUser(json.firstName))
      .catch((err) => console.log(err));
  });

  return (
    <div className="container">
      <Router>
        <NavBar user={user} />

        <Route path="/" exact component={LandingPage} />
        <Route
          path="/cards"
          exact
          component={(props) =>
            withAuth(BabyNameCard)({
              ...props,
            })
          }
        />
        <Route path="/login" render={(props) => <LogIn {...props} />} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/ratings" component={withAuth(Ratings)} />
        <Route path="/account" component={withAuth(AccountDetails)} />
        <Route
          path="/linked"
          component={(props) => withAuth(LinkedUsers)({ ...props, user })}
        />
        <Route
          path="/linked-ratings/:id"
          component={withAuth(LinkedAccountRatings)}
        />
      </Router>
    </div>
  );
}

export default App;
