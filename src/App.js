import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Entrances from "./containers/Entrances";
import Floors from "./containers/Floors";
import Home from "./containers/Home";
import ParkingSpaces from "./containers/ParkingSpaces";

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={Home}/>
        <Route exact path='/floors' component={Floors}/>
        <Route exact path='/parkingSpaces' component={ParkingSpaces}/>
        <Route exact path='/entrances' component={Entrances}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
