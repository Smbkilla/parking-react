import React, {createContext, useState} from 'react';
import {BrowserRouter, Route} from "react-router-dom";

import green from '@material-ui/core/colors/green';
import teal from '@material-ui/core/colors/teal';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Entrances from "./containers/Entrance/Entrances";
import Floors from "./containers/Floors/Floors";
import Home from "./containers/Home/Home";
import NavBar from "./components/NavBar";
import ParkingSpaces from "./containers/ParkingSpaces/ParkingSpaces";

import './App.css';

export const UserContext = createContext(null);

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: green,
  },
  status: {
    danger: 'orange',
  }
});

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <UserContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <NavBar/>
          <Route exact path='/' component={Home}/>
          <Route path='/floors' component={Floors}/>
          <Route path='/parkingSpaces' component={ParkingSpaces}/>
          <Route path='/entrances' component={Entrances}/>
        </BrowserRouter>
      </UserContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
