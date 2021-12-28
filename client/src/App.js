import React, { useState } from "react";
import LogIn from "./components/LogIn";
import { Route } from "react-router-dom";
import Ratings from "./components/Ratings";
import BabyNameCard from "./components/BabyNameCard";
import NavBar from "./components/NavBar";
import { withAuth } from "./components/withAuth";
import SignUp from "./components/SignUp";
import AccountDetails from "./components/AccountDetails/AccountDetails";
import LinkedUsers from "./components/LinkedAccounts/LinkedUsers";
import LinkedAccountRatings from "./components/LinkedAccountRatings";
import LandingPage from "./components/LandingPage";
import { UserContextProvider } from "./components/contexts/UserContext";

function App() {
  return (
    <div className="container">
      <UserContextProvider>
        <NavBar />
      </UserContextProvider>

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
      <Route
        path="/ratings"
        component={(props) => withAuth(Ratings)({ ...props })}
      />
      <Route
        path="/account"
        component={(props) =>
          withAuth(AccountDetails)({
            ...props,
          })
        }
      />
      <Route
        path="/linked"
        component={(props) => withAuth(LinkedUsers)({ ...props })}
      />
      <Route
        path="/linked-ratings/:id"
        component={withAuth(LinkedAccountRatings)}
      />
    </div>
  );
}

export default App;
