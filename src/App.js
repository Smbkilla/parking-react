import React, {createContext, useState} from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import Entrances from "./containers/Entrance/Entrances";
import Floors from "./containers/Floors/Floors";
import Home from "./containers/Home";
import NavBar from "./components/NavBar";
import ParkingSpaces from "./containers/ParkingSpaces/ParkingSpaces";

import './App.css';

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <NavBar/>
          <Route exact path='/' component={Home}/>
          <Route path='/floors' component={Floors}/>
          <Route path='/parkingSpaces' component={ParkingSpaces}/>
          <Route path='/entrances' component={Entrances}/>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
