import { useState } from "react";
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

function App() {
  const [user, setUser] = useState("");
  const getCurrentUser = (name) => {
    setUser(name);
  };

  return (
    <div className="container">
      <Router>
        <NavBar user={user} />
        <Route path="/" exact component={LandingPage} />
        <Route
          path="/cards"
          exact
          component={(props) =>
            withAuth(BabyNameCard)({ ...props, getCurrentUser: getCurrentUser })
          }
        />
        <Route path="/login" render={(props) => <LogIn {...props} />} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/ratings" component={withAuth(Ratings)} />
        <Route path="/account" component={withAuth(AccountDetails)} />
        <Route path="/email" component={LinkEmailForm} />
        <Route path="/linked" component={withAuth(LinkedUsers)} />
        <Route
          path="/linked-ratings/:id"
          component={withAuth(LinkedAccountRatings)}
        />
      </Router>
    </div>
  );
}

export default App;
