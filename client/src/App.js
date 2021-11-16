import React, { useContext, useEffect, useState } from "react";
import LogIn from "./components/LogIn";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Ratings from "./components/Ratings";
import BabyNameCard from "./components/BabyNameCard";
import NavBar from "./components/NavBar";
import { withAuth } from "./components/withAuth";
import SignUp from "./components/SignUp";
import AccountDetails from "./components/AccountDetails";
import LinkedUsers from "./components/LinkedUsers";
import LinkedAccountRatings from "./components/LinkedAccountRatings";
import LandingPage from "./components/LandingPage";
import {
  UserContext,
  UserContextProvider,
} from "./components/contexts/UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const getCurrentUser = (user) => {
    setCurrentUser(user);
  };
  return (
    <UserContextProvider>
      <div className="container">
        <Router>
          <NavBar user={currentUser} />

          <Route path="/" exact component={LandingPage} />
          <Route
            path="/cards"
            exact
            component={(props) =>
              withAuth(BabyNameCard)({
                ...props,
                getCurrentUser,
              })
            }
          />
          <Route path="/login" render={(props) => <LogIn {...props} />} />
          <Route path="/sign-up" component={SignUp} />
          <Route
            path="/ratings"
            component={(props) =>
              withAuth(Ratings)({ ...props, getCurrentUser })
            }
          />
          <Route
            path="/account"
            component={(props) =>
              withAuth(AccountDetails)({
                ...props,
                currentUser: getCurrentUser,
              })
            }
          />
          <Route
            path="/linked"
            component={(props) =>
              withAuth(LinkedUsers)({ ...props, getCurrentUser })
            }
          />
          <Route
            path="/linked-ratings/:id"
            component={withAuth(LinkedAccountRatings)}
          />
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
