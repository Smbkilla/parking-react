import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Entrances from "./containers/Entrance/Entrances";
import Floors from "./containers/Floors/Floors";
import Home from "./containers/Home";
import NavBar from "./components/NavBar";
import ParkingSpaces from "./containers/ParkingSpaces/ParkingSpaces";

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <NavBar/>
            <Route exact path='/' component={Home}/>
            <Route path='/floors' component={Floors}/>
            <Route path='/parkingSpaces' component={ParkingSpaces}/>
            <Route path='/entrances' component={Entrances}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
