import React, {useState} from 'react';
import BabyNameCard from './components/BabyNameCard';
import SignUp from './components/SignUp';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="container">
        <Route path='/' exact component={BabyNameCard} />
        <Route path='/sign-up' component={SignUp} />
      </div>
    </Router>
  );
}

export default App;
